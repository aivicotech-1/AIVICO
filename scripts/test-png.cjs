const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const srcPath = path.join(__dirname, '..', 'src', 'images', 'AivicoTechLogo.png');
const buf = fs.readFileSync(srcPath);

let offset = 8;
const chunks = [];
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  const data = buf.subarray(offset + 8, offset + 8 + len);
  chunks.push({ type, len, offset });
  offset += 12 + len;
}

console.log('PNG Chunks:', chunks.map(c => c.type + `(${c.len})`).join(', '));
const ihdr = buf.subarray(16, 16 + 13);
const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const depth = ihdr.readUInt8(8);
const colorType = ihdr.readUInt8(9);
console.log(`Dimensions: ${width}x${height}, depth: ${depth}, colorType: ${colorType}`);
