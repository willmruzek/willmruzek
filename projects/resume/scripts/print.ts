import fs from 'node:fs';
import path from 'node:path';

import { chromium } from 'playwright';
import { createServer } from 'vite';

const resolveOutDir = (base: string) => path.resolve(base, '../public');
const mkDir = (dir: string) => {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};
const pdfPath = (dir: string) => path.join(dir, 'resume.pdf');

const ensureOutPath = (base: string) => pdfPath(mkDir(resolveOutDir(base)));

async function main() {
  const outPath = ensureOutPath(import.meta.dirname);

  const server = await createServer({
    root: path.resolve(import.meta.dirname, '..'),
    server: { port: 5174 },
    logLevel: 'silent',
  });

  await server.listen();

  const url = server.resolvedUrls?.local[0] ?? 'http://localhost:5174';

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });

  await page.pdf({
    path: outPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', bottom: '0.5in', left: '0.25in', right: '0.25in' },
  });

  await browser.close();
  await server.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
