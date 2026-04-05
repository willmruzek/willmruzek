import projectsYaml from "../../data/projects.yaml";

import { ProjectsSchema } from "./projects-schema";

export async function getProjects() {
  return ProjectsSchema.parse(projectsYaml);
}
