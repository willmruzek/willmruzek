import type { ResumeEngagement } from "@/lib/resume-schema";

export function EngagementMeta({
  company,
  via,
  duration,
}: Pick<ResumeEngagement, "company" | "via" | "duration">) {
  return (
    <div className="x:flex x:items-baseline x:justify-between x:gap-x-4">
      <div className="x:flex x:items-baseline x:gap-2">
        <span className="x:font-medium x:text-gray-900 x:dark:text-gray-100">
          {company}
        </span>
        {via && (
          <span className="x:text-xs x:text-gray-500 x:dark:text-gray-400">
            via{" "}
            <a
              href="https://www.uplift.ltd/"
              target="_blank"
              rel="noreferrer"
              className="x:text-gray-500 x:underline x:underline-offset-2 x:dark:text-gray-400"
            >
              {via}
            </a>
          </span>
        )}
      </div>
      {duration && (
        <span className="x:text-xs x:text-gray-500 x:dark:text-gray-400">
          {duration}
        </span>
      )}
    </div>
  );
}
