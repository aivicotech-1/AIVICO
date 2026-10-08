const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

const srcPath = path.join(__dirname, '..', 'src', 'images', 'AivicoTechLogo.png');
const outPath = path.join(__dirname, '..', 'src', 'images', 'AivicoTechLogoLight.png');

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

// 1. Reconstruct raw uncompressed pixels
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

// 2. Transform pixels: Convert white text to #0f172a, keep blue symbols unchanged
let modifiedCount = 0;
for (let i = 0; i < rawPixels.length; i += 4) {
  const r = rawPixels[i];
  const g = rawPixels[i + 1];
  const b = rawPixels[i + 2];
  const a = rawPixels[i + 3];

  if (a > 0) {
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const diff = maxVal - minVal;

    // Is it white / neutral text (IVIC and TECH)?
    // The blue/cyan marks have diff > 60 and b > r + 30.
    const isBlueSymbol = (diff > 45) && (b > r + 25 || g > r + 25);

    if (!isBlueSymbol) {
      // It's part of the white text letterforms
      const lightness = (r + g + b) / 3;
      // Target dark slate color #0f172a (15, 23, 42)
      rawPixels[i] = 15;
      rawPixels[i + 1] = 23;
      rawPixels[i + 2] = 42;
      // Smooth anti-aliased edge
      const edgeWeight = lightness / 255;
      rawPixels[i + 3] = Math.round(a * edgeWeight);
      modifiedCount++;
    }
  }
}

console.log(`Transformed ${modifiedCount} text pixels to #0f172a.`);

// 3. Encode into new PNG rows using filterType = 0 (None)
const newRowSize = 1 + width * bpp;
const newRawData = Buffer.alloc(height * newRowSize);

for (let y = 0; y < height; y++) {
  const targetOffset = y * newRowSize;
  newRawData[targetOffset] = 0; // Filter 0
  rawPixels.copy(newRawData, targetOffset + 1, y * width * bpp, (y + 1) * width * bpp);
}

const newIdatData = zlib.deflateSync(newRawData, { level: 9 });

// 4. Assemble PNG file
const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrChunk = createChunk('IHDR', ihdr);
const idatChunk = createChunk('IDAT', newIdatData);
const iendChunk = createChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync(outPath, finalPng);

console.log(`Successfully generated light mode logo: ${outPath} (${finalPng.length} bytes)`);
