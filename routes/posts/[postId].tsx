import { define, fetchPost, iComment } from "utils";
import { join } from "@std/path";
import Markdown from "components/Markdown.tsx";

function Comment(props: iComment) {
  return (
    <div class="card-bg">
      <div class="card">
        <p title={props.published_at}>
          {props.time_ago}
        </p>
        <Markdown content={props.content} />
      </div>
    </div>
  );
}

export default define.page(async function Post(props) {
  const post = await fetchPost(
    join("./data/posts/", props.params.postId!, "post.md"),
  );

  return (
    <>
      <nav class="grid">
        <div class="col-full">
          <div class="card-bg">
            <div class="card">
              <a href="/">Stale City</a>
            </div>
          </div>
        </div>
      </nav>
      <header class="grid">
        <div class="col-md">
          <div class="card-bg">
            <div class="card">
              <h1>{post.title}</h1>
              <div class="prose">{post.snippet}</div>
              <p class="text-xs mt-1/1" title={post.published_at}>
                {post.time_ago}
              </p>
            </div>
          </div>
        </div>
      </header>
      <main class="grid">
        <div class="col-md">
          <Markdown content={post.content} />
        </div>
        <div class="col-md">
          {post.comments.map(Comment)}
        </div>
      </main>
      <footer class="grid">
        <div class="col-full">
          <div class="card-bg">
            <div class="card">
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
      </footer>
    </>
  );
});
