/**
 * Resume PDF generator using Playwright
 *
 * Starts a Next.js dev server, navigates to /resume, and saves a PDF.
 * Local-only — not intended for CI.
 *
 * Usage:
 *   pnpm print
 */

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import { chromium } from "playwright";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PORT = 3100;
const URL = `http://localhost:${PORT}/resume`;
const OUT_DIR = path.resolve(__dirname, "../public/static");
const OUT_PATH = path.join(OUT_DIR, "WillMruzekResume.pdf");

function waitForServer(url: string, timeout = 30_000): Promise<void> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      fetch(url)
        .then((res) => {
          if (res.ok) resolve();
          else retry();
        })
        .catch(retry);
    };
    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error(`Server at ${url} did not start within ${timeout}ms`));
        return;
      }
      setTimeout(check, 500);
    };
    check();
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const startServerCmd: [string, string[]] = [
    "pnpm",
    ["exec", "next", "dev", "--port", String(PORT)],
  ];

  console.log("Starting Next.js dev server…");
  console.log(startServerCmd.flat().join(" "));
  const server = cp.spawn(...startServerCmd, {
    cwd: path.resolve(__dirname, ".."),
    stdio: "pipe",
    env: { ...process.env, NODE_ENV: "development" },
  });

  server.stderr?.on("data", (data: Buffer) => {
    const msg = data.toString();
    if (msg.includes("Error")) console.error(msg);
  });

  try {
    await waitForServer(URL);
    console.log("Server ready. Generating PDF…");

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.emulateMedia({ colorScheme: "light" });
    await page.goto(URL, { waitUntil: "networkidle" });

    await page.pdf({
      path: OUT_PATH,
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.5in",
        bottom: "0.5in",
        left: "0.125in",
        right: "0.125in",
      },
    });

    await browser.close();
    console.log(`PDF saved to ${OUT_PATH}`);
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
