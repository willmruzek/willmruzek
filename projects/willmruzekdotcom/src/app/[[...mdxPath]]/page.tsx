import { generateStaticParamsFor, importPage } from "nextra/pages";
import { type Metadata } from "next";
import { IndexWrapper } from "@/components/theme/IndexWrapper";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

function isNextAsset(params: Awaited<Props["params"]>): boolean {
  return params?.mdxPath?.[0] === "_next";
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  if (isNextAsset(params)) return {};

  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

type Props = {
  params: Promise<{ mdxPath?: string[] }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  if (isNextAsset(params)) return null;

  const { default: MDXContent, metadata } = await importPage(params.mdxPath);

  return (
    <IndexWrapper metadata={metadata}>
      <MDXContent {...props} params={params} />
    </IndexWrapper>
  );
}
