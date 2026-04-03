import { generateStaticParamsFor, importPage } from "nextra/pages";
import { type Metadata } from "next";
import { IndexWrapper } from "@/components/theme/IndexWrapper";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

function isNextInternal(params: Awaited<Props["params"]>): boolean {
  const first = params?.mdxPath?.[0];
  return first === "_next" || first === "__tsd";
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  if (isNextInternal(params)) return {};

  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

type Props = {
  params: Promise<{ mdxPath?: string[] }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  if (isNextInternal(params)) return null;

  const { default: MDXContent, metadata } = await importPage(params.mdxPath);

  return (
    <IndexWrapper metadata={metadata}>
      <MDXContent {...props} params={params} />
    </IndexWrapper>
  );
}
