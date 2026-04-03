import { readFile } from "node:fs/promises";
import path from "node:path";

import yaml from "js-yaml";

import { ResumeSchema } from "./resume-schema";

export async function getResume() {
  const yamlPath = path.join(process.cwd(), "data/resume.yaml");
  const raw = await readFile(yamlPath, "utf-8");
  return ResumeSchema.parse(yaml.load(raw));
}
