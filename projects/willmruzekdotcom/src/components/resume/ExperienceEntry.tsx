import type { ResumeExperience } from "@/lib/resume-schema";
import clsx from "clsx";

import { resumeTechStackSurroundClassName } from "./resumeMetaLine";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseMonthYear(s: string): Date {
  const [mon, year] = s.split(" ");
  const monthIndex = MONTHS.includes(mon)
    ? MONTHS.indexOf(mon)
    : FULL_MONTHS.indexOf(mon);
  return new Date(Number(year), monthIndex);
}

function formatDuration(
  startDate: string,
  endDate: string | undefined,
): string {
  const start = parseMonthYear(startDate);
  const end = endDate ? parseMonthYear(endDate) : new Date();
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function getDateRange(exp: ResumeExperience): string | undefined {
  if (!exp.startDate) return exp.duration;

  const duration = exp.duration ?? formatDuration(exp.startDate, exp.endDate);
  const range = `${exp.startDate} – ${exp.endDate ?? "Present"}`;

  if (!duration) return range;

  return `${range} · ${duration}`;
}

export function ExperienceEntry({ exp }: { exp: ResumeExperience }) {
  const dateRange = getDateRange(exp);
  const metaParts = [exp.stage, exp.employmentType, exp.location].filter(
    (part): part is string => Boolean(part),
  );

  return (
    <div className={clsx(exp.pageBreak && "x:break-before-page")}>
      <div className="x:flex x:flex-wrap x:items-baseline x:justify-between x:gap-x-4 x:leading-(--resume-baseline-step)">
        <div className="x:leading-(--resume-baseline-step)">
          <span className="x:leading-(--resume-baseline-step) x:font-semibold x:text-gray-900 x:dark:text-gray-100">
            {exp.title ?? exp.company}
          </span>
          {exp.title && (
            <>
              <span className="x:mx-1 x:leading-(--resume-baseline-step) x:text-gray-400">
                ·
              </span>
              <span className="x:leading-(--resume-baseline-step) x:text-gray-700 x:dark:text-gray-300">
                {exp.company}
              </span>
            </>
          )}
        </div>
        {dateRange && (
          <span className="x:text-xs x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400">
            {dateRange}
          </span>
        )}
      </div>

      {metaParts.length > 0 && (
        <p className="x:text-sm x:leading-(--resume-baseline-step) x:text-gray-500 x:dark:text-gray-400">
          {metaParts.join(" · ")}
        </p>
      )}

      {exp.tech && exp.tech.length > 0 && (
        <p className={resumeTechStackSurroundClassName}>
          {exp.tech.map((technology) => (
            <span
              key={technology}
              className="x:inline-flex x:items-center x:rounded-sm x:bg-[#eaf3ff] x:px-2 x:text-xs x:leading-(--resume-baseline-step) x:text-[#506b90] x:dark:bg-[#253c5c] x:dark:text-[#c3d8f4] x:print:bg-gray-100 x:print:text-gray-900"
            >
              {technology}
            </span>
          ))}
        </p>
      )}

      {exp.bullets && (
        <ul
          className={clsx(
            "x:list-disc x:space-y-0 x:pl-4 x:text-sm x:leading-(--resume-baseline-step) x:text-gray-900 x:dark:text-gray-100",
            exp.tech ? "x:mt-0" : "x:mt-(--resume-baseline-step)",
          )}
        >
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
