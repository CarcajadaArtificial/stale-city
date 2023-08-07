import { Header, Main, Markdown, Text } from 'lunchbox';
import { Handlers, PageProps } from '$fresh/server.ts';
import { getPost, Post } from '../../src/data.ts';

interface BlogPostPageData {
  post: Post;
}

export const handler: Handlers<BlogPostPageData> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();

    return ctx.render({ post });
  },
};

/**
 * @todo [!!] Redirect /blog/1 to /blog/1_...
 */
export default function PostPage(props: PageProps<BlogPostPageData>) {
  const { post } = props.data;
  const date = post.published_at.toString() !== 'Invalid Date' &&
    new Date(post.published_at).toLocaleDateString('en-US', {
      dateStyle: 'long',
    });

  return (
    <>
      <Header layout_type='center' gradient_pattern='zigzag'>
        <Text noMargins type='small'>{date}</Text>
        <Text type='display'>{post.title}</Text>
        <Text>{post.snippet}</Text>
        <div class='h-12' />
      </Header>
      <Main layout_type='center'>
        <Markdown markdown_content={post.content} />
      </Main>
    </>
  );
}
