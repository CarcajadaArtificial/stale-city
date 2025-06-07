import { define, fetchPost, iComment } from "utils";
import { join } from "@std/path";
import Markdown from "components/Markdown.tsx";

function Comment(props: iComment, index: number) {
  return (
    <div tabindex={0} class="prose" id={`comment-${index + 1}`}>
      <p class="text-xs mb-1-4" title={props.metadata.published_at}>
        Commented {props.time_ago}
      </p>
      <p class="mt-0 bg-base-200 noise">{props.content}</p>
    </div>
  );
}

export default define.page(async function Post(props) {
  const post = await fetchPost(
    join("./data/posts/", props.params.postId!, "post.md"),
  );

  return (
    <main class="layout pt-3-1">
      <header class="col-span-full prose">
        <h1 autofocus tabindex={0} class="mb-1-4">{post.metadata.title}</h1>
        <p tabindex={0}>{post.metadata.snippet}</p>
        <ul class="mt-2 mb-0 pl-4">
          <li tabindex={0} class="text-xs">
            {post.readingMinutes.toFixed(0)} minute read
          </li>
          <li tabindex={0} class="text-xs" title={post.metadata.published_at}>
            Published {post.time_ago}
          </li>
          {post.comments.length === 0 ? null : (
            <li tabindex={0} class="text-xs">
              Updated {post.comments[post.comments.length - 1].time_ago}
            </li>
          )}
        </ul>
        {post.metadata.vignette
          ? (
            <img
              tabIndex={0}
              class="vignette my-1-4"
              src={`/images/${post.metadata.vignette}.png`}
            />
          )
          : null}
      </header>
      <div class="col-span-full">
        <Markdown content={post.content} />
        <div class="mt-8">
          {post.comments.map(Comment)}
        </div>
      </div>
      <div class="col-md">
        {/* TOC */}
      </div>
    </main>
  );
});
