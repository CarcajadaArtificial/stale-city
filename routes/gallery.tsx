import { define, fetchPosts } from "utils";

export default define.page(async function () {
  const posts = await fetchPosts("./data/posts");

  const postVignettes = posts.filter((post) =>
    post.metadata.vignette !== undefined
  ).sort((a, b) =>
    new Date(b.metadata.published_at).getTime() -
    new Date(a.metadata.published_at).getTime()
  );

  return (
    <main class="layout my-2-1">
      <div class="col-span-full prose">
        <span>
          ←{" "}
          <a tabindex={0} href="/" class="link inline-block mb-2-1">
            Return home
          </a>
        </span>
        <h1 tabIndex={0}>Gallery</h1>
      </div>
      {postVignettes.map((post, i) => (
        <div class="col-span-full md:col-span-3 lg:col-span-4" key={i}>
          <a tabindex={0} href={`/posts/${post.file_name}`}>
            <img
              class="vignette"
              src={`/images/${post.metadata.vignette}.png`}
              alt=""
            />
          </a>
        </div>
      ))}
    </main>
  );
});
