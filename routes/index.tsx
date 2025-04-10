import { define } from "../utils.ts";
import { extractYaml } from "@std/front-matter";
import { timeAgo } from "@egamagz/time-ago";
import { Footer, Header, Main } from "lunchbox/atoms/Page.tsx";
import { H1, H2 } from "lunchbox/atoms/Heading.tsx";
import Link from "lunchbox/atoms/Link.tsx";
import * as List from "lunchbox/atoms/List.tsx";

interface iPost {
  title: string;
  published_at: string;
  snippet: string;
  file_name: string;
  content: string;
}

async function fetchPosts(dir: string): Promise<iPost[]> {
  const postFiles = await Deno.readDir(dir);
  const posts = [];

  for await (const file of postFiles) {
    if (file.name.endsWith(".md")) {
      const content = await Deno.readTextFile(`${dir}/${file.name}`);
      posts.push({
        ...extractYaml<Omit<iPost, "content">>(content).attrs,
        file_name: file.name,
        content,
      });
    }
  }

  return posts;
}

function PostIndex(props: iPost) {
  return (
    <li>
      <Link href={`posts/${props.file_name}`}>{props.title}</Link>,{" "}
      <span class="text-xs" title={props.published_at}>
        {timeAgo(new Date(props.published_at))}
      </span>
    </li>
  );
}

export default define.page(async function Home() {
  const posts = await fetchPosts("./data/posts");
  return (
    <>
      <Header>
        <div class="col-span-full">
          <H1>Stale City</H1>
        </div>
      </Header>
      <Main>
        <div class="col-span-full">
          <H2>Posts</H2>
          <List.ul>
            {posts.map(PostIndex)}
          </List.ul>
        </div>
      </Main>
      <Footer>
        <div class="col-span-full">
          📡 <Link href="rss.xml">RSS</Link>
        </div>
      </Footer>
    </>
  );
});
