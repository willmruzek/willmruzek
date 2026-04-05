import type { Metadata } from "next";

import { ProjectsContent } from "@/components/projects/ProjectsContent";
import { getProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Personal projects and side work by Will Mruzek.",
};

export default async function ProjectsPage() {
  const { projects } = await getProjects();
  return <ProjectsContent projects={projects} />;
}
