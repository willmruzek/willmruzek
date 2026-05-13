import type { Resume } from "@/lib/resume-schema";

import { LongResumeContent } from "./LongResumeContent";
import { ShortResumeContent } from "./ShortResumeContent";

type ResumeFormat = "full" | "short";

export function ResumeContent({
  resume,
  format = "full",
}: {
  resume: Resume;
  format?: ResumeFormat;
}) {
  if (format === "short") return <ShortResumeContent resume={resume} />;

  return <LongResumeContent resume={resume} />;
}
