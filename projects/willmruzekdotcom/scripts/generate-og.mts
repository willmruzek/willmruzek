#!/usr/bin/env tsx
/**
 * OG image generator using Satori (HTML -> SVG) and Resvg (SVG -> PNG)
 * - Scans for posts
 * - Reads frontmatter.title
 * - Generates 1200x630 PNGs at public/og/thoughts/{year}/{slug}.png
 *
 * Usage:
 *   pnpm generate:og
 *   pnpm generate:og --force
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs-extra";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import React from "react";
import { fromAsyncThrowable } from "neverthrow";

const WIDTH = 1200;
const HEIGHT = 630;

const CONTENT_GLOB = "content/thoughts/*/*.mdx";
const OUTPUT_ROOT = "public/og/thoughts";

async function loadFonts() {
  return await Promise.all([
    fs.readFile("public/static/fonts/AtkinsonHyperlegible-Regular.ttf"),
    fs.readFile("public/static/fonts/AtkinsonHyperlegible-Bold.ttf"),
  ]);
}

const GRADIENT = {
  stops: [
    { color: "#A8FFF2", offset: "0%" },
    { color: "#4350FF", offset: "75%" },
    { color: "#4350FF", offset: "100%" },
  ],
  angle: 225,
};

type CliOptions = {
  force: boolean;
};

function parseArgs(argv: string[]): CliOptions {
  const force = argv.includes("--force") || argv.includes("-f");
  return { force };
}

async function readPostInfo(file: string) {
  const raw = await fs.readFile(file, "utf8");
  const { data } = matter(raw);

  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    throw new Error(
      `Missing or empty frontmatter.title for ${path.relative(process.cwd(), file)}`,
    );
  }

  const title = data.title.trim();
  const hasCustomImage =
    typeof data.image === "string" && data.image.trim().length > 0;

  const year = path.basename(path.dirname(file));
  const slug = path.basename(file, path.extname(file));

  return { file, year, slug, title, hasCustomImage };
}

function angleToCoords(angleDeg: number) {
  const a = ((angleDeg % 360) + 360) % 360;
  const rad = (a * Math.PI) / 180;
  const cx = Math.cos(rad);
  const cy = Math.sin(rad);
  const x1 = 0.5 - 0.5 * cx;
  const y1 = 0.5 - 0.5 * cy;
  const x2 = 0.5 + 0.5 * cx;
  const y2 = 0.5 + 0.5 * cy;
  return { x1, y1, x2, y2 };
}

function pickFontSize(title: string) {
  const len = title.trim().length;
  if (len > 120) return 56;
  if (len > 90) return 64;
  if (len > 60) return 72;
  return 84;
}

function buildOgTree(opts: {
  title: string;
  gradient: { stops: { color: string; offset: string }[]; angle: number };
  fontSize: number;
  siteLabel?: string;
  titleTop?: number;
}) {
  const { title, gradient, fontSize, siteLabel } = opts;
  const { x1, y1, x2, y2 } = angleToCoords(gradient.angle);
  const titleTop = opts.titleTop ?? 0.2;

  const container = {
    display: "flex",
    width: WIDTH,
    height: HEIGHT,
    position: "relative" as const,
    background: "#0b0b0b",
    color: "#ffffff",
    overflow: "hidden",
    fontFamily: "Atkinson",
  };

  const content = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-end",
    padding: 64,
    paddingTop: 64,
    width: "100%",
    height: "100%",
  };

  const titleStyle = {
    display: "block",
    fontSize,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1.25,
    maxWidth: 1000,
    whiteSpace: "pre-wrap" as const,
  };

  const labelStyle = {
    fontSize: 28,
    opacity: 0.95,
    alignSelf: "flex-end",
    display: "flex",
  };

  return React.createElement(
    "div",
    { style: container },
    // Background gradient layer
    React.createElement(
      "svg",
      {
        width: WIDTH,
        height: HEIGHT,
        viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
        style: { position: "absolute", inset: 0 },
      },
      React.createElement(
        "defs",
        null,
        React.createElement(
          "linearGradient",
          {
            id: "bg",
            gradientUnits: "objectBoundingBox",
            x1: String(x1),
            y1: String(y1),
            x2: String(x2),
            y2: String(y2),
          },
          ...gradient.stops.map((s) =>
            React.createElement("stop", {
              offset: s.offset,
              stopColor: s.color,
            }),
          ),
        ),
      ),
      React.createElement("rect", {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        fill: "url(#bg)",
      }),
      React.createElement("rect", {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        fill: "rgba(0,0,0,0.25)",
      }),
    ),
    // Foreground
    React.createElement(
      "div",
      { style: content },
      React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: HEIGHT * titleTop,

            left: 64,
            right: 64,
            display: "flex",
            flexDirection: "column",
          },
        },
        React.createElement("div", { style: titleStyle }, title),
      ),
      siteLabel
        ? React.createElement("div", { style: labelStyle }, siteLabel)
        : null,
    ),
  );
}

async function createSvg(args: {
  title: string;
  gradient: { stops: { color: string; offset: string }[]; angle: number };
  fontSize: number;
  siteLabel?: string;
  fontRegular: Parameters<Awaited<typeof satori>>[1]["fonts"][number]["data"];
  fontBold: Parameters<Awaited<typeof satori>>[1]["fonts"][number]["data"];
}): Promise<string> {
  const { title, gradient, fontSize, siteLabel, fontRegular, fontBold } = args;

  return await satori(
    buildOgTree({
      title,
      gradient,
      fontSize,
      siteLabel,
    }),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Atkinson", data: fontRegular, weight: 400, style: "normal" },
        { name: "Atkinson", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );
}

function createPng(svg: string): Buffer {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  })
    .render()
    .asPng();
}

async function shouldWrite(outPath: string, next: Buffer): Promise<boolean> {
  const exists = await fs.pathExists(outPath);
  if (!exists) return true;

  const prev = await fs.readFile(outPath);
  if (prev.length !== next.length) return true;

  // Byte-for-byte compare
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) return true;
  }

  // Identical bytes -> no write
  return false;
}

const opts = parseArgs(process.argv.slice(2));
const files: string[] = await fg(CONTENT_GLOB);

const [fontRegular, fontBold] = await loadFonts();

let generated = 0;
let skipped = 0;
let failed = 0;

type ProcessFileResultValue =
  | { type: "skipped"; reason: "unchanged" | "customImage" }
  | { type: "wrote"; outPath: string };

const processFile = fromAsyncThrowable(
  async (file: string): Promise<ProcessFileResultValue> => {
    const info = await readPostInfo(file);

    if (info.hasCustomImage) {
      return { type: "skipped", reason: "customImage" };
    }

    const gradient = GRADIENT;
    const fontSize = pickFontSize(info.title);

    const svg = await createSvg({
      title: info.title,
      gradient,
      fontSize,
      siteLabel: "willmruzek.com",
      fontRegular,
      fontBold,
    });

    const png = createPng(svg);

    const outPath = path.join(OUTPUT_ROOT, info.year, `${info.slug}.png`);
    await fs.ensureDir(path.dirname(outPath));

    if (!opts.force) {
      const changed = await shouldWrite(outPath, png);
      if (!changed) {
        return { type: "skipped", reason: "unchanged" };
      }
    }

    await fs.writeFile(outPath, png);

    return { type: "wrote", outPath };
  },
  (e) => e as Error,
);

for (const file of files) {
  const result = await processFile(file);

  if (result.isOk()) {
    const processedFile = result.value;

    if (processedFile.type === "skipped") {
      skipped++;

      if (processedFile.reason === "unchanged") {
        console.log(
          `  Skipped (unchanged): ${path.relative(process.cwd(), file!)}`,
        );
      } else if (processedFile.reason === "customImage") {
        console.log(
          `  Skipped (has custom image): ${path.relative(process.cwd(), file)}`,
        );
      }
    } else if (processedFile.type === "wrote") {
      generated++;
      console.log(
        ` Generated: ${path.relative(process.cwd(), processedFile.outPath)}`,
      );
    }
  } else {
    failed++;
    console.error(`Error processing ${file}:`, result.error);
  }
}

console.log(
  "\n",
  `Done. Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`,
);
