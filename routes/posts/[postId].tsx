import { define, fetchPost } from "utils";
import { join } from "@std/path";
import { cn } from "@vyn/cn";
import { Footer, Header, Main } from "lunchbox/atoms/Page.tsx";
import Markdown from "lunchbox/molecules/Markdown.tsx";
import * as Nav from "lunchbox/atoms/Nav.tsx";
import Link from "lunchbox/atoms/Link.tsx";
import Prose from "lunchbox/atoms/Prose.tsx";
import { H1 } from "lunchbox/atoms/Heading.tsx";
import clr from "lunchbox/particles/clr.ts";
import focus from "lunchbox/particles/focus.ts";

export default define.page(async function Post(props) {
  const post = await fetchPost(
    join("./data/posts/", props.params.postId!, "post.md"),
  );
  return (
    <>
      <Nav.Static>
        <div class="col-span-full md:col-span-8">
          <a href="/" class={cn("font-heading", clr.brand.txt, focus)}>
            Stale City
          </a>
        </div>
      </Nav.Static>
      <Header>
        <div class="col-span-full">
          <H1>{post.title}</H1>
          <Prose>{post.snippet}</Prose>
          <p class="text-xs mt-1/1" title={post.published_at}>
            {post.time_ago}
          </p>
        </div>
      </Header>
      <Main>
        <div class="col-span-full lg:col-span-8">
          <Markdown content={post.content} />
        </div>
      </Main>
      <Footer>
        <div class="col-span-full flex mt-2/1 gap-1/1">
          <span>
            📡 <Link href="rss.xml">RSS</Link>
          </span>
          <span>
            🐙 <Link href="https://github.com/CarcajadaArtificial">GitHub</Link>
          </span>
          <span>
            🐘 <Link href="https://techhub.social/@carcajada">Mastodon</Link>
          </span>
        </div>
      </Footer>
    </>
  );
});
