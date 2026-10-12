import {
  faXTwitter,
  faGithub,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Markdown, { type Components } from "react-markdown";
import { Email } from "react-obfuscate-email";
import { SocialMediaIconLinkList } from "@/components/SocialMediaIconLinkList";
import { IndexWrapper } from "@/components/theme/IndexWrapper";
import { getHomepageContent } from "@/lib/site-content";

import type { Metadata } from "next";

const homepageMarkdownComponents: Components = {
  a: ({ children, href, title }) => (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

export const metadata: Metadata = {
  title: { absolute: "Will Mruzek's Website" },
};

function HomePageHeader() {
  return (
    <div className="x:mb-12 x:flex x:flex-col x:items-center x:gap-8 x:sm:flex-row x:sm:items-center x:sm:justify-between">
      <div>
        <h1 className="x:text-5xl x:leading-18 x:font-extrabold x:tracking-tight x:text-balance x:text-gray-900 x:sm:text-6xl x:dark:text-gray-100">
          Hi there 👋
          <br />
          <span className="x:text-5xl">
            I&apos;m Will{" "}
            <span className="x:relative x:inline-block x:pb-8">
              Mruzek
              <em className="x:absolute x:right-0 x:bottom-0 x:text-base x:leading-6 x:font-normal x:tracking-normal x:text-gray-500 x:dark:text-gray-400">
                (mroo-zeck)
              </em>
            </span>
          </span>
        </h1>
      </div>
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

async function HomePage() {
  const homepage = await getHomepageContent();

  return (
    <IndexWrapper header={<HomePageHeader />}>
      <Markdown components={homepageMarkdownComponents}>{homepage}</Markdown>

      <p>
        Contact me at{" "}
        <Email className="x:underline" email="hello@willmruzek.com" />.
      </p>

      <SocialMediaIconLinkList
        icons={[
          [faGithub, "https://github.com/willmruzek"],
          [faLinkedin, "https://www.linkedin.com/in/willmruzek/"],
          [faXTwitter, "https://twitter.com/willmruzek"],
          [faStackOverflow, "https://stackoverflow.com/users/243673/will-m"],
        ]}
      />
    </IndexWrapper>
  );
}

export default HomePage;
