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
  title: "Will Mruzek's Website",
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
        I&apos;m a <strong>senior full-stack software engineer</strong> with{" "}
        <strong>13+ years of experience</strong> helping startups and
        established companies turn business goals into well-crafted
        applications. I&apos;ve worked with teams at{" "}
        <strong>
          <a
            href="https://lumalabs.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Luma AI
          </a>
        </strong>
        ,{" "}
        <strong>
          <a
            href="https://www.creditkarma.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Intuit Credit Karma
          </a>
        </strong>
        ,{" "}
        <strong>
          <a
            href="https://www.reforge.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reforge
          </a>
        </strong>
        ,{" "}
        <strong>
          <a href="https://duo.com/" target="_blank" rel="noopener noreferrer">
            Duo Security (Cisco)
          </a>
        </strong>
        , and{" "}
        <strong>
          <a
            href="https://www.humblebundle.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Humble Bundle
          </a>
        </strong>
        , among others.
      </p>

      <p>
        I work primarily with <strong>React</strong>,{" "}
        <strong>TypeScript</strong>, <strong>Next.js</strong>,{" "}
        <strong>Node.js</strong>, <strong>Postgres</strong>, and{" "}
        <strong>GraphQL</strong>. My experience spans 0-to-1 product
        development, application architecture, and modernizing existing systems.
      </p>

      <p>
        I care deeply about{" "}
        <strong>user experience and developer experience</strong>. I favor
        thoughtful architecture, code that&apos;s easy to reason about, and
        software that can adapt to changing requirements without unnecessary
        complexity. I&apos;m particularly interested in functional programming,
        immutability, and tools that make developers more effective.
      </p>

      <p>
        Outside of software engineering, I sing, compose music, act, and write.
      </p>

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
