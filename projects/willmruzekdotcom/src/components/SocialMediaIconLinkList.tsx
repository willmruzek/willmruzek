import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SocialMediaIconLinkList({
  icons,
}: {
  icons: [icon: IconDefinition, href: string][];
}) {
  return (
    <ul className="not-prose x:mt-0 x:flex x:list-none x:flex-row x:gap-2 x:p-0 x:text-gray-900 x:dark:text-white">
      {icons.map(([icon, href]) => (
        <li key={href} className="x:p-0">
          <a href={href} target="_blank">
            <FontAwesomeIcon icon={icon} className="x:h-5 x:w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
