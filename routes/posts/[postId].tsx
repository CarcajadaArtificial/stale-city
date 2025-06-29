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

export default define.page(async function (props) {
  const post = await fetchPost(
    join("./data/posts/", props.params.postId!, "post.md"),
  );

  if (!post) return new Response(null, { status: 404 });

  return (
    <main class="layout pt-3-1">
      <header class="col-span-full prose">
        <span>
          ←{" "}
          <a tabindex={0} href="/" class="link inline-block mb-2-1">
            Return home
          </a>
        </span>
        <h1 autofocus tabindex={0} class="mb-1-4">{post.metadata.title}</h1>
        <span class="text-xs" tabindex={0}>
          This {post.readingMinutes.toFixed(0)}{" "}
          minute read was written by Poncho, published {post.time_ago}
          {post.comments.length === 0
            ? "."
            : `, and updated ${
              post.comments[post.comments.length - 1].time_ago
            }.`} It is under an <a href="/license">MIT License</a>, here is the
          {" "}
          <a
            href={`https://github.com/CarcajadaArtificial/stale-city/blob/main/data/posts/${props
              .params.postId!}/post.md`}
          >
            source
          </a>.
        </span>
        <p tabindex={0}>{post.metadata.snippet}</p>
        {post.metadata.vignette
          ? (
            <img
              tabIndex={0}
              class="vignette mt-3-2 mb-1-1 rounded border-1 border-base-300"
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
