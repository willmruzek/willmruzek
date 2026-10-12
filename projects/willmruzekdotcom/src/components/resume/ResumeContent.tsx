import type { Resume } from "@/lib/resume-schema";

import { LongResumeContent } from "./LongResumeContent";

export function ResumeContent({ resume }: { resume: Resume }) {
  return <LongResumeContent resume={resume} />;
}
