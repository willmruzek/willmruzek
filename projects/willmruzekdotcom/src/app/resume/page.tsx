import type { Metadata } from "next";

import { ResumeContent } from "@/components/resume/ResumeContent";
import { getResume } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume | Will Mruzek",
  description:
    "Software Engineer with 13+ years of experience in React, TypeScript, Next.js, Node.js, and more.",
};

export default async function ResumePage() {
  const resume = await getResume();
  return <ResumeContent resume={resume} />;
}
