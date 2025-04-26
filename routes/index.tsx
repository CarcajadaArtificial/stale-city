import { define, fetchPosts, iPost } from "utils";
import Markdown from "components/Markdown.tsx";

function PostIndex(props: iPost) {
  return (
    <li>
      <a href={`posts/${props.file_name}`}>{props.title}</a>,{" "}
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
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const intro = await Deno.readTextFile("./data/docs/blog/intro.md");
  return (
    <>
      <header class="grid">
        <div class="col-md">
          <div class="card-bg">
            <div class="card">
              <h1 class="h0">Stale City</h1>
              <Markdown content={intro} />
              <ul>
                <li>
                  📡 <a href="rss.xml">RSS</a>
                </li>
                <li>
                  🐙 <a href="https://github.com/CarcajadaArtificial">GitHub</a>
                </li>
                <li>
                  🐘 <a href="https://techhub.social/@carcajada">Mastodon</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main class="grid">
        <div class="col-md">
          <ul>
            {posts.map(PostIndex)}
          </ul>
        </div>
      </main>
      <footer></footer>
    </>
  );
});
