import {
  faXTwitter,
  faGithub,
  faStackOverflow,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const availabilityLinkClassName =
  "x:inline-flex x:min-h-11 x:w-6 x:shrink-0 x:items-center x:justify-center x:focus-visible:outline-2 x:focus-visible:outline-offset-4 x:focus-visible:outline-current";

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
    <IndexWrapper
      header={
        <>
          <HomePageHeader />
          <aside
            aria-label="Work availability"
            className="x:mb-12 x:flex x:flex-col x:gap-4 x:rounded-xl x:border x:border-blue-200 x:bg-blue-50/70 x:p-5 x:text-blue-800 x:sm:flex-row x:sm:items-center x:sm:justify-between x:dark:border-[color-mix(in_oklab,var(--x-color-blue-800),var(--x-color-slate-700))] x:dark:bg-blue-950/40 x:dark:text-blue-200"
          >
            <div className="x:flex x:items-start x:gap-3">
              <span
                aria-hidden="true"
                className="x:mt-2 x:size-2 x:shrink-0 x:rounded-full x:bg-green-600 x:dark:bg-green-400"
              />
              <div>
                <p className="x:text-base x:leading-6 x:font-semibold x:text-gray-900 x:dark:text-gray-100">
                  Actively interviewing for full-time &amp; contract
                  opportunities.
                </p>
                <p className="x:mt-1 x:text-sm x:leading-6 x:text-gray-600 x:dark:text-gray-300">
                  Remote, or hybrid in NYC.
                </p>
              </div>
            </div>
            <div className="x:relative x:grid x:grid-cols-2 x:items-center x:text-sm x:leading-6 x:font-semibold x:sm:flex x:sm:shrink-0 x:sm:gap-4">
              <div className="x:flex x:items-center x:justify-evenly x:sm:justify-center x:sm:gap-2">
                <a
                  href="https://www.linkedin.com/in/willmruzek/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className={availabilityLinkClassName}
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    aria-hidden="true"
                    className="x:size-5"
                  />
                </a>
                <a
                  href="https://github.com/willmruzek"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className={availabilityLinkClassName}
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    aria-hidden="true"
                    className="x:size-5"
                  />
                </a>
              </div>
              <span
                aria-hidden="true"
                className="x:absolute x:left-1/2 x:h-6 x:w-px x:-translate-x-1/2 x:bg-blue-200 x:sm:static x:sm:shrink-0 x:sm:translate-x-0 x:dark:bg-blue-800"
              />
              <div className="x:pl-4 x:sm:pl-0">
                <Email
                  email="hello@willmruzek.com"
                  className="x:inline-flex x:min-h-11 x:w-full x:items-center x:justify-center x:rounded-lg x:bg-blue-700 x:px-4 x:py-2.5 x:whitespace-nowrap x:text-white x:transition-colors x:hover:bg-blue-800 x:focus-visible:outline-2 x:focus-visible:outline-offset-4 x:focus-visible:outline-blue-700 x:sm:w-auto x:sm:px-8 x:dark:bg-blue-300 x:dark:text-blue-950 x:dark:hover:bg-blue-200 x:dark:focus-visible:outline-blue-300"
                >
                  Let&apos;s talk
                </Email>
              </div>
            </div>
          </aside>
        </>
      }
    >
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
