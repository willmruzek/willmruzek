import type { Metadata } from "next";

import "./resume-rhythm.css";

import { ResumeContent } from "@/components/resume/ResumeContent";
import { getResume } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume",
};

const resumePrintPageStyle = `
  @page {
    size: letter portrait;
    margin: 0.5in;
  }

`;

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <>
      <style media="print">{resumePrintPageStyle}</style>
      <ResumeContent resume={resume} />
    </>
  );
}
