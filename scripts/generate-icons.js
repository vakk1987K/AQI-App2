import fs from 'fs';
import zlib from 'zlib';

function createPng(width, height, r, g, b, a = 255) {
  // Simple uncompressed or deflate PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.concat([typeBuf, data]);
    const crc = calcCrc(crcBuf);
    const crcOut = Buffer.alloc(4);
    crcOut.writeInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcOut]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Raw image data with filter byte (0) per row
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // None filter
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Circular gradient or icon visual
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxR = width * 0.45;
      
      if (dist < maxR) {
        // Inner circle with gradient
        const t = (x + y) / (width + height);
        rawData[pxOffset] = Math.floor(16 + t * 40);      // R
        rawData[pxOffset + 1] = Math.floor(185 + t * 40); // G
        rawData[pxOffset + 2] = Math.floor(129 + t * 100);// B
        rawData[pxOffset + 3] = 255;
      } else {
        // Dark background #0f172a
        rawData[pxOffset] = 15;
        rawData[pxOffset + 1] = 23;
        rawData[pxOffset + 2] = 42;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const idatData = zlib.deflateSync(rawData);

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idatData),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function calcCrc(buf) {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1));
}

const p192 = createPng(192, 192, 16, 185, 129);
fs.writeFileSync('public/pwa-192x192.png', p192);

const p512 = createPng(512, 512, 16, 185, 129);
fs.writeFileSync('public/pwa-512x512.png', p512);
fs.writeFileSync('public/pwa-maskable-512x512.png', p512);

const p180 = createPng(180, 180, 16, 185, 129);
fs.writeFileSync('public/apple-touch-icon.png', p180);
fs.writeFileSync('public/favicon.ico', p180);

console.log('Successfully generated PWA icons!');
