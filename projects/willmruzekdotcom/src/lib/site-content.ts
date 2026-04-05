import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
const DATA_ROOT = path.join(process.cwd(), "data");

async function readFileOrEmpty(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return "";
  }
}

/**
 * Recursively collect all .md / .mdx files under a directory, excluding _dev
 * and any path segment starting with an underscore.
 */
async function collectBlogPosts(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const visible = entries.filter((e) => !e.name.startsWith("_"));

  const groups = await Promise.all(
    visible.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectBlogPosts(fullPath);
      if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) return [fullPath];
      return [];
    }),
  );

  return groups.flat();
}

/**
 * Assembles all public site content into a single string to use as LLM context.
 * Always includes published blog posts regardless of the ENABLE_BLOG feature flag.
 */
export async function getSiteContent(): Promise<string> {
  const [homepage, resume, projects] = await Promise.all([
    readFileOrEmpty(path.join(ROOT, "index.mdx")),
    readFileOrEmpty(path.join(DATA_ROOT, "resume.yaml")),
    readFileOrEmpty(path.join(DATA_ROOT, "projects.yaml")),
  ]);

  const thoughtsDir = path.join(ROOT, "thoughts");
  let blogSection = "";

  try {
    const postPaths = await collectBlogPosts(thoughtsDir);
    if (postPaths.length > 0) {
      const postContents = await Promise.all(
        postPaths.map(async (p) => {
          const content = await fs.readFile(p, "utf-8");
          const relativePath = path.relative(thoughtsDir, p);
          return `### Blog post: ${relativePath}\n\n${content}`;
        }),
      );
      blogSection = `## Blog Posts\n\n${postContents.join("\n\n---\n\n")}`;
    }
  } catch {
    // thoughts directory may not exist; silently skip
  }

  const sections = [
    "## Homepage / About\n\n" + homepage,
    "## Resume / Work History\n\n" + resume,
    "## Projects / Side Projects\n\n" + projects,
    blogSection,
  ].filter(Boolean);

  return sections.join("\n\n---\n\n");
}
