import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import { format } from "date-fns";
import { RouteContext } from "$fresh/server.ts";
import { getMarkdown, Post } from "@/src/utils.ts";
import Footer from "@/components/Footer.tsx";

export default async function (_req: Request, ctx: RouteContext) {
  const markdownFile = await getMarkdown<Post>(
    "data/posts",
    `${ctx.params.postId}.md`,
  );
  return (
    <>
      <Header>
        <Layout whitespace>
          <Module size="md">
            <Text type="display">{markdownFile?.attrs.title}</Text>
            <Text>{markdownFile?.attrs.snippet}</Text>
            <Text type="small">
              <Code>
                {format(
                  new Date(String(markdownFile?.attrs.published_at)),
                  "yyyy/MM/dd",
                )}
              </Code>
            </Text>
          </Module>
        </Layout>
      </Header>
      <Pattern type="zigzag" />
      <Main>
        <Layout whitespace>
          <Module size="lg">
            <Markdown markdownContent={markdownFile?.content} />
          </Module>
        </Layout>
      </Main>
      <Footer />
    </>
  );
}
