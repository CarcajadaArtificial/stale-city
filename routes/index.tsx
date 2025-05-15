import { define, fetchPosts, iPost } from "utils";
import Markdown from "components/Markdown.tsx";
import Gradient from "components/Gradient.tsx";

function PostIndex(props: iPost) {
  return (
    <a href={`posts/${props.file_name}`} class="no-underline">
      <div class="card-bg">
        <div class="card">
          <h4>{props.metadata.title}</h4>
          <div class="prose mt-2">
            {props.metadata.snippet}
          </div>
          <ul class="mt-2 mb-0 pl-4">
            <li class="text-xs">
              {props.readingMinutes.toFixed(0)} minute read
            </li>
            <li class="text-xs">
              Published {props.time_ago}
            </li>
            {props.comments.length === 0 ? null : (
              <li class="text-xs">
                Updated {props.comments[props.comments.length - 1].time_ago}
              </li>
            )}
          </ul>
        </div>
      </div>
    </a>
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
      <Gradient>
        <header class="py-8 grid">
          <div class="col-md">
            <div class="card">
              <h1>Stale City</h1>
              <Markdown className="no-margins" content={intro} />
            </div>
          </div>
        </header>
      </Gradient>
      <main class="grid">
        <div class="col-md">
          {posts.map(PostIndex)}
        </div>
        <div>
          {/* Cool image or something */}
        </div>
      </main>
    </>
  );
});
