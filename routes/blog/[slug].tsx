import { Header, Main, Markdown, Text } from 'lunchbox';
import { Handlers, PageProps } from '$fresh/server.ts';
import { getPost, MdPost } from '../../src/data.ts';
import PostInfo from '../../components/PostInfo.tsx';
import Navigation from '../../components/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

interface BlogPostPageData {
  post: MdPost;
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

  return (
    <>
      <Navigation />
      <Header layout_type='center' gradient_pattern='zigzag'>
        <PostInfo display post={post} />
      </Header>
      <Main layout_type='center'>
        <Markdown markdown_content={post.content} />
      </Main>
      <Footer />
    </>
  );
}
