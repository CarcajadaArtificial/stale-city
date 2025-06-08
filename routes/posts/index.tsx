import { define, fetchPosts } from "utils";

export default define.page(async function () {
  const posts = await fetchPosts("./data/posts");
  posts.sort((a, b) =>
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
        <h1 tabIndex={0}>All Posts</h1>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <a href={`/posts/${post.file_name}`}>{post.metadata.title}</a>
              <span class="text-xs">, {post.time_ago}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
});
