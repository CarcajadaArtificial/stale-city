import { RouteContext } from "$fresh/server.ts";
import { format } from "date-fns";
import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";
import {
  fileArrayFromDirectory,
  getMarkdown,
  mdFetch,
  Post,
} from "@/src/utils.ts";

export default async function (_req: Request, ctx: RouteContext) {
  const path = "data/posts";
  const fileNames = fileArrayFromDirectory(path).map((file) => file.name);
  const extractedFiles = await Promise.all(
    fileNames.map(async (fileName) => await getMarkdown<Post>(path, fileName)),
  );

  // console.log(extractedFiles);

  return (
    <>
      <Header>
        <Layout whitespace>
          <Module size="md">
            <Text type="display">My thoughts</Text>
            <Markdown
              markdownContent={await mdFetch("../data/docs/blog/intro.md")}
            />
          </Module>
        </Layout>
      </Header>
      <Pattern type="zigzag" />
      <Main>
        <Layout whitespace>
          <Module>
            {extractedFiles.map((extractedFile) => (
              <Text noMargins>
                <Code>
                  {format(
                    new Date(String(extractedFile?.attrs.published_at)),
                    "yyyy/MM/dd",
                  )}
                </Code>{" "}
                <Link
                  href={ctx.url.href + "/" + extractedFile?.slug.slice(0, -3)}
                >
                  {extractedFile?.attrs.title}
                </Link>
              </Text>
            ))}
          </Module>
        </Layout>
      </Main>
    </>
  );
}
