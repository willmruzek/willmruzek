import {
  faTwitter,
  faGithub,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { Email } from "react-obfuscate-email";
import { SocialMediaIconLinkList } from "@/components/SocialMediaIconLinkList";
import { IndexWrapper } from "@/components/theme/IndexWrapper";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hi there 👋 I'm Will Mruzek",
};

function HomePageHeader() {
  return (
    <div className="x:mb-12 x:flex x:flex-col x:items-center x:gap-8 x:sm:flex-row x:sm:items-center x:sm:justify-between">
      <h1 className="x:text-5xl x:leading-18 x:font-extrabold x:tracking-tight x:text-balance x:text-gray-900 x:sm:text-6xl x:dark:text-gray-100">
        Hi there 👋
        <br />
        <span className="x:text-5xl">I&apos;m Will Mruzek</span>
      </h1>
      <Image
        src="/static/me.jpeg"
        alt="Will Mruzek"
        width={192}
        height={192}
        priority
        className="x:size-40 x:rounded-full x:object-cover x:object-[50%_38%] x:sm:size-48 x:sm:shrink-0 x:dark:ring-gray-800"
      />
    </div>
  );
}

function HomePage() {
  return (
    <IndexWrapper header={<HomePageHeader />}>
      <p>
        I&apos;m a <strong>senior engineer and software consultant</strong> with{" "}
        <strong>over 13 years of experience</strong>. I help{" "}
        <strong>startups and established companies</strong> turn business goals
        into well-crafted applications. My consulting work includes projects
        with <strong>Syncari</strong>, <strong>Reforge</strong>, and{" "}
        <strong>Intuit Credit Karma</strong>.
      </p>

      <p>
        Previously, I held full-time engineering roles at{" "}
        <strong>Reforge</strong>, <strong>Duo Security (Cisco)</strong>,{" "}
        <strong>Spredfast</strong>, <strong>CloudPassage</strong>, and{" "}
        <strong>Humble Bundle</strong>.
      </p>

      <p>
        Day to day, I use <strong>React</strong>, <strong>Next.js</strong>,{" "}
        <strong>TypeScript</strong>, <strong>Node.js</strong>,{" "}
        <strong>Postgres</strong>, <strong>GraphQL</strong>, and{" "}
        <strong>Tailwind CSS</strong>.
      </p>

      <p>
        I&apos;m passionate about <strong>developer tooling</strong>,{" "}
        <strong>UX</strong>, <strong>DX</strong>, <strong>type-safety</strong>,
        and <strong>functional programming</strong>. I aim to craft code
        that&apos;s principled, predictable, and adaptable to change, while
        avoiding unnecessary complexity.
      </p>

      <p>Outside of coding, I sing, compose music, act, and write.</p>

      <p>
        Contact me at{" "}
        <Email className="x:underline" email="hello@willmruzek.com" />.
      </p>

      <SocialMediaIconLinkList
        icons={[
          [faGithub, "https://github.com/willmruzek"],
          [faLinkedin, "https://www.linkedin.com/in/willmruzek/"],
          [faTwitter, "https://twitter.com/willmruzek"],
          [faStackOverflow, "https://stackoverflow.com/users/243673/will-m"],
        ]}
      />
    </IndexWrapper>
  );
}

export default HomePage;
