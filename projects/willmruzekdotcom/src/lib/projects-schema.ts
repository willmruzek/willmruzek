import { z } from "zod";

const ProjectDescriptionParagraphSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().min(1),
});

const ProjectDescriptionListSchema = z.object({
  type: z.literal("list"),
  items: z.array(z.string().min(1)).min(1),
});

export const ProjectDescriptionBlockSchema = z.discriminatedUnion("type", [
  ProjectDescriptionParagraphSchema,
  ProjectDescriptionListSchema,
]);

export const ProjectSchema = z
  .object({
    name: z.string().min(1),
    url: z.string().min(1).optional(),
    source_url: z.string().min(1).optional(),
    description: z.array(ProjectDescriptionBlockSchema).min(1),
    tech: z.array(z.string().min(1)).optional(),
  })
  .transform(({ source_url, ...rest }) => ({
    ...rest,
    sourceUrl: source_url,
  }));

export const ProjectsSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type ProjectDescriptionBlock = z.infer<
  typeof ProjectDescriptionBlockSchema
>;
export type Project = z.infer<typeof ProjectSchema>;
export type Projects = z.infer<typeof ProjectsSchema>;
