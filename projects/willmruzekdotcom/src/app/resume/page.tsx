import type { Metadata } from "next";

import "./resume-rhythm.css";

import { ResumeContent } from "@/components/resume/ResumeContent";
import { getResume } from "@/lib/resume-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Software Engineer with 13+ years of experience in React, TypeScript, Next.js, Node.js, and more.",
};

const resumePrintPageStyle = `
  @page {
    size: letter portrait;
    margin: 0.5in;
  }

  /* Normalize list/inline text to the short-resume root size. Omit paragraph
     tags and subsection headings so their font-size utilities apply in print. */
  .resume-short-print
    :is(ul, ol, li, div, span, a):not(.resume-subsection-heading) {
    font-size: inherit !important;
  }
`;

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string }>;
}) {
  const resume = await getResume();
  const { format } = await searchParams;

  return (
    <>
      <style media="print">{resumePrintPageStyle}</style>
      <ResumeContent
        resume={resume}
        format={format === "short" ? "short" : "full"}
      />
    </>
  );
}
