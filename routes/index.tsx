import { Handlers, PageProps } from '$fresh/server.ts';
import { getPosts, Post } from '../utils/posts.ts';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main>
      <h2>Blog</h2>
      {posts.map((post) => (
        <div>
          <PostCard post={post} />
          <hr />
        </div>
      ))}
    </main>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div>
      <h3>{post.title}</h3>
      <time>
        {new Date(post.published_at).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <p>{post.snippet}</p>
      <a href={`/${post.slug}`}>Read post</a>
    </div>
  );
}
