import { define, fetchPosts } from "utils";
import Markdown from "components/Markdown.tsx";

export default define.page(async function Home() {
  const intro = await Deno.readTextFile("./data/docs/blog/intro.md");

  const posts = await fetchPosts("./data/posts");
  posts.sort((a, b) =>
    new Date(b.metadata.published_at).getTime() -
    new Date(a.metadata.published_at).getTime()
  );
  const mostRecentPost = posts[0];

  const comments = posts.map((post) =>
    post.comments.map((comment) => ({ comment: comment, post: post }))
  ).flat().sort((a, b) =>
    new Date(b.comment.metadata.published_at).getTime() -
    new Date(a.comment.metadata.published_at).getTime()
  );

  return (
    <>
      <header class="layout pt-3-1">
        <div class="col-span-full prose">
          <h1 autofocus tabindex={0}>Stale City</h1>
          <Markdown content={intro} />
        </div>
      </header>

      <main class="layout my-2-1">
        <div class="col-span-full lg:col-span-8 z-1">
          <div tabindex={0} class="prose mt-1-2 pb-1-1 mb-1 dotted">
            <div class="badge badge-sm badge-primary">
              Recently posted
            </div>
            <h2 class="mb-1-8 mt-1-2">
              <a href={`posts/${mostRecentPost.file_name}`}>
                {mostRecentPost.metadata.title}
              </a>
            </h2>
            <p class="mb-1-8">{mostRecentPost.metadata.snippet}</p>
            <ul class="mt-1-8">
              <li class="text-xs">
                {mostRecentPost.readingMinutes.toFixed(0)} minute read
              </li>
              <li class="text-xs">
                Published {mostRecentPost.time_ago}
              </li>
              {mostRecentPost.comments.length === 0
                ? null
                : (
                  <li class="text-xs">
                    Updated {mostRecentPost
                      .comments[mostRecentPost.comments.length - 1].time_ago}
                  </li>
                )}
            </ul>
          </div>
          {mostRecentPost.metadata.vignette
            ? (
              <div tabindex={0} class="prose mb-2-1 bg-base-100">
                <img
                  class="vignette rounded border-1 border-base-300"
                  src={`/images/${mostRecentPost.metadata.vignette}.png`}
                />
              </div>
            )
            : null}
          <Markdown removeChildAfter={3} content={mostRecentPost.content} />
          <div class="relative">
            <div
              style={{
                background: `var(--gradient-dotted)`,
              }}
              class="absolute -top-3-1 opacity-92 dark:opacity-95 pl-1-1 pb-1-1 pt-16 w-[65ch]"
            >
              <a
                class="inline-block link link-primary"
                href={`posts/${mostRecentPost.file_name}`}
                tabindex={0}
              >
                Continue reading...
              </a>
            </div>
          </div>
          <div class="prose mt-24">
            <h2>Recent author comments</h2>
            {comments.map((comment) => (
              <>
                <p tabindex={0} class="bg-base-200 mb-0 mt-2-1">
                  {comment.comment.content}
                </p>
                <p class="mt-1-4">
                  Commented {comment.comment.time_ago}, on{" "}
                  <a tabindex={0} href={`posts/${comment.post.file_name}`}>
                    {comment.post.metadata.title}
                  </a>
                </p>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
});

/*

<div
  class="col-span-full min-h-64 max-w-[65ch] h-full bg-cover bg-center rounded"
  style={{
    backgroundImage: "url(/images/stale_city_6.png)",
    imageRendering: "pixelated",
  }}
>
  <img
    class="mix-blend-color-dodge bordr "
    src="/images/stale_city_2.png"
    alt=""
  />
</div>

 */
