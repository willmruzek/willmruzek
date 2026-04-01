import { z } from "zod";

/**
 * Zod schema for validating blog post metadata from Nextra's importPage.
 * Matches the actual structure returned by importPage(...).metadata.
 * Includes both frontmatter fields and Nextra-added metadata properties.
 */
export const BlogPostMetadataSchema = z.object({
  // Required fields
  title: z.string().min(1, "Title is required"),
  author: z.string(),
  description: z.string().min(1, "Description is required"),
  date: z.coerce.date(),

  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  image: z.string().optional(),

  // Nextra-added metadata properties
  filePath: z.string(),
  timestamp: z.number().optional(),

  // BlogMetadata properties from nextra-theme-blog
  readingTime: z
    .object({
      text: z.string().optional(),
      minutes: z.number().optional(),
      time: z.number().optional(),
      words: z.number().optional(),
    })
    .optional(),
});

export type BlogPostMetadata = z.infer<typeof BlogPostMetadataSchema>;
