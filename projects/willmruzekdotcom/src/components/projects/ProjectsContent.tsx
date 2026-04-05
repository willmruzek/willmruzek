import type { Projects } from "@/lib/projects-schema";

export function ProjectsContent({
  projects,
}: {
  projects: Projects["projects"];
}) {
  return (
    <div className="x:mt-[calc(var(--tw-baseline-unit-value-px)*3)]">
      <h1 className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-500 x:uppercase x:dark:text-gray-400">
        Projects
      </h1>
      <div className="x:space-y-(--tw-baseline-unit-value-px)">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="x:font-semibold x:text-gray-900 x:dark:text-gray-100">
              {project.name}
            </div>
            <div>
              {project.description.map((block, blockIndex) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={`${project.name}-${blockIndex}`}
                      className="x:text-base x:leading-(--tw-baseline-unit-value-px) x:text-gray-900 x:dark:text-gray-100"
                    >
                      {block.text}
                    </p>
                  );
                }

                return (
                  <ul
                    key={`${project.name}-${blockIndex}`}
                    className="x:list-disc x:pl-6 x:text-base x:text-gray-900 x:dark:text-gray-100"
                  >
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="x:leading-(--tw-baseline-unit-value-px)"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
            {project.tech && project.tech.length > 0 && (
              <p className="x:mt-1 x:text-sm x:leading-(--tw-baseline-unit-value-px) x:text-gray-500 x:dark:text-gray-400">
                {project.tech.join(" · ")}
              </p>
            )}
            {(project.url || project.sourceUrl) && (
              <div className="x:mt-1 x:flex x:gap-3 x:text-sm x:text-gray-500 x:dark:text-gray-400">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="x:underline x:hover:text-gray-900 x:dark:hover:text-gray-100"
                  >
                    Visit
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="x:underline x:hover:text-gray-900 x:dark:hover:text-gray-100"
                  >
                    Source
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
