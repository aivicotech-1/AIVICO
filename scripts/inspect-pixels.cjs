const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const srcPath = path.join(__dirname, '..', 'src', 'images', 'AivicoTechLogo.png');
const buf = fs.readFileSync(srcPath);

let offset = 8;
const idatParts = [];
let ihdr = null;

while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  const data = buf.subarray(offset + 8, offset + 8 + len);
  if (type === 'IHDR') ihdr = data;
  if (type === 'IDAT') idatParts.push(data);
  offset += 12 + len;
}

const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const compressed = Buffer.concat(idatParts);
const decompressed = zlib.inflateSync(compressed);

const bpp = 4;
const rowSize = 1 + width * bpp;

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

// Reconstruct all rows
const rawPixels = Buffer.alloc(width * height * bpp);
let prevRow = Buffer.alloc(width * bpp);

for (let y = 0; y < height; y++) {
  const rowStart = y * rowSize;
  const filterType = decompressed[rowStart];
  const currentRow = Buffer.alloc(width * bpp);

  for (let x = 0; x < width * bpp; x++) {
    const rawByte = decompressed[rowStart + 1 + x];
    const left = x >= bpp ? currentRow[x - bpp] : 0;
    const up = prevRow[x];
    const upLeft = x >= bpp ? prevRow[x - bpp] : 0;

    let reconByte = 0;
    switch (filterType) {
      case 0: reconByte = rawByte; break;
      case 1: reconByte = (rawByte + left) & 0xff; break;
      case 2: reconByte = (rawByte + up) & 0xff; break;
      case 3: reconByte = (rawByte + Math.floor((left + up) / 2)) & 0xff; break;
      case 4: reconByte = (rawByte + paeth(left, up, upLeft)) & 0xff; break;
      default: reconByte = rawByte;
    }
    currentRow[x] = reconByte;
  }

  currentRow.copy(rawPixels, y * width * bpp);
  prevRow = currentRow;
}

// Sample pixels: find pixels with high alpha
let whiteCount = 0;
let blueCount = 0;
let samples = [];

for (let i = 0; i < rawPixels.length; i += 4) {
  const r = rawPixels[i];
  const g = rawPixels[i + 1];
  const b = rawPixels[i + 2];
  const a = rawPixels[i + 3];

  if (a > 50) {
    const diff = Math.max(r, g, b) - Math.min(r, g, b);
    if (diff < 30 && r > 200) {
      whiteCount++;
      if (samples.length < 5) samples.push({ type: 'white', r, g, b, a, diff });
    } else if (b > r + 40) {
      blueCount++;
      if (samples.length < 10 && samples.filter(s => s.type === 'blue').length < 5) {
        samples.push({ type: 'blue', r, g, b, a, diff });
      }
    }
  }
}

console.log(`Reconstruction successful! White pixels: ${whiteCount}, Blue pixels: ${blueCount}`);
console.log('Sample pixels:', samples);
