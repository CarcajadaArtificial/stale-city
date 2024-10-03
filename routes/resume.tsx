import { RouteContext } from "$fresh/server.ts";
import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";
import {
  fileArrayFromDirectory,
  getMarkdown,
  mdFetch,
  MdTimelineEvent,
} from "@/src/utils.ts";
import Footer from "@/components/Footer.tsx";
import TimelineEvent from "@/islands/TimelineEvent.tsx";

export default async function (_req: Request, ctx: RouteContext) {
  const path = "data/docs/resume/timeline";
  const fileNames = fileArrayFromDirectory(path).map((file) => file.name);
  const extractedFiles = (await Promise.all(fileNames.map(
    async (fileName) => (await getMarkdown<MdTimelineEvent>(path, fileName))!,
  ))).sort((a, b) =>
    parseInt(b!.slug.split(".")[0]) - parseInt(a!.slug.split(".")[0])
  );

  return (
    <>
      <Header>
        <Layout whitespace>
          <Module size="xl">
            <Text type="display">My developer story</Text>
            <Markdown
              markdownContent={await mdFetch("../data/docs/resume/bio.md")}
            />
            <Text class="mt-4">
              <Link href="./cv_oscar_guerrero.pdf">
                Downloadable one-page PDF resume
              </Link>
            </Text>
          </Module>
        </Layout>
      </Header>
      <Pattern type="zigzag" />
      <Main>
        <Layout whitespace>
          {extractedFiles.map(TimelineEvent)}
        </Layout>
      </Main>
      <Footer />
    </>
  );
}
