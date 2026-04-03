import { generateStaticParamsFor, importPage } from "nextra/pages";
import { type Metadata } from "next";
import { IndexWrapper } from "@/components/theme/IndexWrapper";

export const generateStaticParams = async () => {
  const params = await generateStaticParamsFor("mdxPath")();
  return params.filter((p) => {
    const segments = Array.isArray(p.mdxPath) ? p.mdxPath : [p.mdxPath];
    return !segments.some((segment) => segment.startsWith("_"));
  });
};

function isExcluded(params: Awaited<Props["params"]>): boolean {
  const first = params?.mdxPath?.[0];
  if (first === "_next" || first === "__tsd") return true;
  if (params?.mdxPath?.some((segment) => segment.startsWith("_"))) return true;
  return false;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  if (isExcluded(params)) return {};

  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

type Props = {
  params: Promise<{ mdxPath?: string[] }>;
};

export default async function Page(props: Props) {
  const params = await props.params;

  if (isExcluded(params)) return null;

  const { default: MDXContent, metadata } = await importPage(params.mdxPath);

  return (
    <IndexWrapper metadata={metadata}>
      <MDXContent {...props} params={params} />
    </IndexWrapper>
  );
}
