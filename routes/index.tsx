import { define, fetchPosts, iPost } from "utils";
import { Header, Main } from "lunchbox/atoms/Page.tsx";
import { H1, H2 } from "lunchbox/atoms/Heading.tsx";
import Link from "lunchbox/atoms/Link.tsx";
import Markdown from "lunchbox/molecules/Markdown.tsx";
import * as List from "lunchbox/atoms/List.tsx";

function PostIndex(props: iPost) {
  return (
    <li>
      <Link href={`posts/${props.file_name}`}>{props.title}</Link>,{" "}
      <span class="text-xs">
        {props.time_ago}
      </span>
    </li>
  );
}

export default define.page(async function Home() {
  const posts = await fetchPosts("./data/posts");
  posts.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const intro = await Deno.readTextFile("./data/docs/blog/intro.md");
  return (
    <>
      <Header>
        <div class="col-span-full">
          <H1>Stale City</H1>
          <Markdown content={intro} />
          <div class="flex mt-2/1 gap-1/1">
            <span>
              📡 <Link href="rss.xml">RSS</Link>
            </span>
            <span>
              🐙 <Link href="github.com/CarcajadaArtificial">GitHub</Link>
            </span>
            <span>
              🐘 <Link href="techhub.social/@carcajada">Mastodon</Link>
            </span>
          </div>
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
    </>
  );
});
