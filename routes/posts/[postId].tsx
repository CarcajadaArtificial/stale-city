import { define, fetchPost, iComment } from "utils";
import { join } from "@std/path";
import Markdown from "components/Markdown.tsx";
import PostActions from "../../components/PostActions.tsx";

function Comment(props: iComment, index: number) {
  return (
    <div class="card-bg" id={`comment-${index + 1}`}>
      <div class="card">
        <Markdown content={props.content} />
        <p class="text-xs mt-1/1" title={props.metadata.published_at}>
          Commented {props.time_ago}
        </p>
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
      <main class="grid">
        <nav class="col-full">
          <div class="card">
            <a href="/">Stale City</a>
          </div>
        </nav>
        <div class="col-md">
          <header class="card-bg">
            <div class="card">
              <h1>{post.metadata.title}</h1>
              <Markdown
                className="no-margins mt-2"
                content={post.metadata.snippet}
              />
              <ul class="mt-2 mb-0 pl-4">
                <li class="text-xs">
                  {post.readingMinutes.toFixed(0)} minute read
                </li>
                <li class="text-xs" title={post.metadata.published_at}>
                  Published {post.time_ago}
                </li>
                {post.comments.length === 0 ? null : (
                  <li class="text-xs">
                    Updated {post.comments[post.comments.length - 1].time_ago}
                  </li>
                )}
              </ul>
              {post.metadata.vignette
                ? (
                  <img
                    class="vignette"
                    src={`/images/${post.metadata.vignette}.png`}
                  />
                )
                : null}
            </div>
          </header>
          <PostActions
            postFileName={props.params.postId!}
            postTitle={post.metadata.title}
            postUrl={props.url.href}
          />
        </div>
        <div class="col-md" />
        <div class="col-md">
          <Markdown content={post.content} />
          <div class="mt-8">
            {post.comments.map(Comment)}
          </div>
        </div>
        <div class="col-md">
          {/* TOC */}
        </div>
      </main>
    </>
  );
});
