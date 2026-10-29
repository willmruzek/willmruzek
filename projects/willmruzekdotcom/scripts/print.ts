/**
 * Resume PDF generator using Puppeteer
 *
 * Prints the public resume and an optional private-email copy outside public/.
 * RESUME_PRIVATE_EMAIL is loaded from the environment or .env.local.
 * Local-only — not intended for CI.
 *
 * Usage:
 *   pnpm print
 */

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import url from "node:url";

import puppeteer, { type Page, type PDFOptions } from "puppeteer";
import { z } from "zod";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}/resume`;
const OUT_DIR = path.resolve(__dirname, "../public/static");
const OUT_PATH = path.join(OUT_DIR, "WillMruzekResume.pdf");
const PRIVATE_OUT_PATH = path.resolve(
  __dirname,
  "../private/WillMruzekResume.pdf",
);

export async function printResumePdfs({
  page,
  publicPath,
  privatePath,
  privateEmail,
}: {
  readonly page: Page;
  readonly publicPath: string;
  readonly privatePath: string;
  readonly privateEmail?: string;
}): Promise<void> {
  const email = privateEmail?.trim() || undefined;
  if (email) z.email().parse(email);

  const options: PDFOptions = {
    format: "letter",
    preferCSSPageSize: true,
    printBackground: true,
  };

  fs.mkdirSync(path.dirname(publicPath), { recursive: true });
  await page.pdf({ ...options, path: publicPath });
  console.log(`Public PDF saved to ${publicPath}`);

  if (!email) {
    console.warn(
      "RESUME_PRIVATE_EMAIL is not set; generated only the public resume PDF. Any existing private PDF was not updated.",
    );
    return;
  }

  const publicEmail = await page.$eval(
    "[data-resume-email]",
    (element) => element.textContent,
  );
  await page.$eval(
    "[data-resume-email]",
    (element, value) => {
      element.textContent = value;
    },
    email,
  );

  try {
    fs.mkdirSync(path.dirname(privatePath), { recursive: true });
    await page.pdf({ ...options, path: privatePath });
    console.log(`Private PDF saved to ${privatePath}`);
  } finally {
    await page.$eval(
      "[data-resume-email]",
      (element, value) => {
        element.textContent = value;
      },
      publicEmail,
    );
  }
}

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
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) process.loadEnvFile(envPath);

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
  }

  try {
    await waitForServer(BASE_URL);
    console.log("Server ready. Generating resume PDF…");

    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);
      await page.goto(BASE_URL, { waitUntil: "networkidle0" });
      await printResumePdfs({
        page,
        publicPath: OUT_PATH,
        privatePath: PRIVATE_OUT_PATH,
        privateEmail: process.env.RESUME_PRIVATE_EMAIL,
      });
    } finally {
      await browser.close();
    }
  } finally {
    server?.kill();
  }
}

if (
  process.argv[1] &&
  import.meta.url === url.pathToFileURL(process.argv[1]).href
) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
