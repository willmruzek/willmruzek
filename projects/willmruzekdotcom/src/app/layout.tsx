import "./globals.css";

import { Head } from "nextra/components";
import localFont from "next/font/local";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout } from "@/components/theme/Layout";
import { Navbar } from "@/components/theme/Navbar";

import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import type React from "react";

// TODO: Use next/font/google when it when next updated to @capsizecss/metrics@3.5.0
const atkinsonHyperlegible = localFont({
  src: "../../public/fonts/AtkinsonHyperlegibleNext-VariableFont_wght.ttf",
  variable: "--font-atkinson",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Will Mruzek",
};

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
            &copy; {new Date().getFullYear()} Will Mruzek
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
