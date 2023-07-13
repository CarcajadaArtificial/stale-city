import { Handlers, PageProps } from '$fresh/server.ts';
import { getPosts, Post } from '../utils/posts.ts';
import { Main, Header, Text, Link, Separator, Footer } from 'lunchbox';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div>
      <Header layout_type="center">
        <Text class="text-center" type="display">
          Stale City
        </Text>
      </Header>
      <Main layout_type="center">
        {posts.map((post) => (
          <div>
            <PostCard post={post} />
            <Separator />
          </div>
        ))}
      </Main>
      <Footer></Footer>
    </div>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div>
      <Text noMargins type="heading">
        {post.title}
      </Text>
      <Text noMargins type="small">
        <time>
          {new Date(post.published_at).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </Text>
      <Text>{post.snippet}</Text>
      <Link href={`/blog/${post.slug}`}>Read post</Link>
    </div>
  );
}
