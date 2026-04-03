import type { ResumeExperience } from "@/lib/resume-schema";

import { ClientEntry } from "./ClientEntry";
import { OtherEngagementEntry } from "./OtherEngagementEntry";

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

function parseMonthYear(s: string): Date {
  const [mon, year] = s.split(" ");
  return new Date(Number(year), MONTHS.indexOf(mon));
}

function formatDuration(
  startDate: string,
  endDate: string | undefined,
): string {
  const start = parseMonthYear(startDate);
  const end = endDate ? parseMonthYear(endDate) : new Date();
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function ExperienceEntry({ exp }: { exp: ResumeExperience }) {
  const duration = formatDuration(exp.startDate, exp.endDate);
  const dateRange = `${exp.startDate} – ${exp.endDate ?? "Present"} · ${duration}`;

  return (
    <div
      className={`x:break-inside-avoid${exp.pageBreak ? "x:break-before-page" : ""}`}
    >
      <div className="x:flex x:flex-wrap x:items-baseline x:justify-between x:gap-x-4">
        <div>
          <span className="x:font-semibold x:text-gray-900 x:dark:text-gray-100">
            {exp.title}
          </span>
          <span className="x:mx-1 x:text-gray-400">·</span>
          <span className="x:text-gray-700 x:dark:text-gray-300">
            {exp.company}
          </span>
        </div>
        <span className="x:text-xs x:text-gray-500 x:dark:text-gray-400">
          {dateRange}
        </span>
      </div>

      {exp.location && (
        <p className="x:text-sm x:text-gray-500 x:dark:text-gray-400">
          {exp.location}
        </p>
      )}

      {exp.tech && (
        <p className="x:mt-(--tw-baseline-unit-value-px) x:border-l x:border-gray-400 x:pl-2 x:text-xs x:leading-(--tw-baseline-unit-value-px) x:text-gray-500 x:dark:border-gray-500 x:dark:text-gray-400 x:print:mt-3 x:print:leading-6">
          {exp.tech.join(", ")}
        </p>
      )}

      {exp.bullets && (
        <ul className="x:mt-(--tw-baseline-unit-value-px) x:list-disc x:space-y-(--tw-baseline-unit-value-px) x:pl-4 x:text-base x:leading-(--tw-baseline-unit-value-px) x:text-gray-900 x:dark:text-gray-100 x:print:mt-3 x:print:space-y-2 x:print:text-sm x:print:leading-6">
          {exp.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {exp.clients && exp.clients.length > 0 && (
        <div className="x:mt-(--tw-baseline-unit-value-px) x:pl-4 x:print:mt-6">
          <div className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-400 x:uppercase">
            Clients
          </div>
          {exp.clients.map((client, i) => (
            <ClientEntry key={i} client={client} />
          ))}
        </div>
      )}

      {exp.otherEngagements && exp.otherEngagements.length > 0 && (
        <div className="x:mt-(--tw-baseline-unit-value-px) x:pl-4 x:print:mt-6">
          <div className="x:mb-(--tw-baseline-unit-value-px) x:text-xs x:font-semibold x:tracking-widest x:text-gray-400 x:uppercase">
            Other Engagements
          </div>
          {exp.otherEngagements.map((engagement, i) => (
            <OtherEngagementEntry key={i} engagement={engagement} />
          ))}
        </div>
      )}
    </div>
  );
}
