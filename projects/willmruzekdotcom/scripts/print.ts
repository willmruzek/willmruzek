/**
 * Resume PDF generator using Puppeteer
 *
 * Starts a Next.js dev server, navigates to /resume, and saves PDFs.
 * Local-only — not intended for CI.
 *
 * Usage:
 *   pnpm print
 */

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import puppeteer from "puppeteer";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}/resume`;
const OUT_DIR = path.resolve(__dirname, "../public/static");
const PRINT_TARGETS = [
  {
    url: BASE_URL,
    outPath: path.join(OUT_DIR, "WillMruzekResume.pdf"),
  },
  {
    url: `${BASE_URL}?format=short`,
    outPath: path.join(OUT_DIR, "WillMruzekResumeShort.pdf"),
  },
];

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

async function isPortInUse(url: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    return res.ok || res.status >= 400; // any HTTP response means something is listening
  } catch {
    return false;
  }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const alreadyRunning = await isPortInUse(BASE_URL);
  let server: cp.ChildProcess | null = null;

  if (alreadyRunning) {
    console.log(`Server already running at ${BASE_URL}, reusing it.`);
  } else {
    const startServerCmd: [string, string[]] = [
      "pnpm",
      ["exec", "next", "dev", "--turbopack", "--port", String(PORT)],
    ];

    console.log("Starting Next.js dev server…");
    console.log(startServerCmd.flat().join(" "));
    server = cp.spawn(...startServerCmd, {
      cwd: path.resolve(__dirname, ".."),
      stdio: "pipe",
      env: { ...process.env, NODE_ENV: "development" },
    });

    server.stderr?.on("data", (data: Buffer) => {
      const msg = data.toString();
      if (msg.includes("Error")) console.error(msg);
    });

    await waitForServer(BASE_URL);
  }

  try {
    console.log("Server ready. Generating PDFs…");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "light" },
    ]);

    for (const { url, outPath } of PRINT_TARGETS) {
      await page.goto(url, { waitUntil: "networkidle0" });

      await page.pdf({
        path: outPath,
        format: "letter",
        preferCSSPageSize: true,
        printBackground: true,
      });

      console.log(`PDF saved to ${outPath}`);
    }

    await browser.close();
  } finally {
    server?.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
