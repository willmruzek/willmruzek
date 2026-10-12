import "./globals.css";

import { Head } from "nextra/components";
import localFont from "next/font/local";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout } from "@/components/theme/Layout";
import { Navbar } from "@/components/theme/Navbar";
import { getResume } from "@/lib/resume-data";

import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import type React from "react";

// TODO: Use next/font/google when it when next updated to @capsizecss/metrics@3.5.0
const atkinsonHyperlegible = localFont({
  src: "../../public/static/fonts/AtkinsonHyperlegibleNext-VariableFont_wght.ttf",
  variable: "--font-atkinson",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getResume();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://willmruzek.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: resume.name,
      template: `%s | ${resume.name}`,
    },
    description: resume.summary,
    authors: [{ name: resume.name, url: siteUrl }],
    keywords: resume.topSkills,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pageMap = await getPageMap();
  // console.log('pageMap', pageMap);
  // const { topLevelNavbarItems } = normalizePages({
  //   list: pageMap,
  //   route: '/',
  // });
  // console.log('topLevelNavbarItems', topLevelNavbarItems);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={atkinsonHyperlegible.variable}
    >
      <Head backgroundColor={{ dark: "#0f172a", light: "#fff" }} />
      <body className={atkinsonHyperlegible.className}>
        <Layout>
          <Navbar pageMap={await getPageMap()}></Navbar>

          {children}

          <Footer>
            &copy; {new Date().getFullYear()} Will Mruzek · Code for this
            Next.js site is{" "}
            <a
              href="https://github.com/willmruzek/willmruzek/tree/main/projects/willmruzekdotcom"
              target="_blank"
              rel="noreferrer"
              className="x:underline"
            >
              here
            </a>
            {/* <a href="/feed.xml" style={{ float: 'right' }}>
              RSS
            </a> */}
          </Footer>
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
