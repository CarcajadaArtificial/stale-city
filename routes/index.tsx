import { define, fetchPosts, iPost } from "utils";
import Markdown from "components/Markdown.tsx";
import Footer from "components/Footer.tsx";

function PostIndex(props: iPost) {
  return (
    <li>
      <a href={`posts/${props.file_name}`}>{props.metadata.title}</a>,{" "}
      <span class="text-xs">
        {props.time_ago}
      </span>,{" "}
      <span class="text-xs">
        {props.readingMinutes.toFixed(0)} minute read
      </span>
    </li>
  );
}

export default define.page(async function Home() {
  const posts = await fetchPosts("./data/posts");
  posts.sort((a, b) =>
    new Date(b.metadata.published_at).getTime() -
    new Date(a.metadata.published_at).getTime()
  );
  const intro = await Deno.readTextFile("./data/docs/blog/intro.md");
  return (
    <>
      <main class="grid">
        <div class="col-md">
          <header class="card-bg">
            <div class="card">
              <h1 class="h0">Stale City</h1>
              <Markdown content={intro} />
            </div>
          </header>
          <ul class="mt-12">
            {posts.map(PostIndex)}
          </ul>
        </div>
        <div>
          {/* Cool image or something */}
        </div>
        <Footer />
      </main>
    </>
  );
});
