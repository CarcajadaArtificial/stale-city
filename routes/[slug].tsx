import { Handlers, PageProps } from '$fresh/server.ts';
import { getPost, Post } from '../utils/posts.ts';
import { render } from 'gfm';

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function (props: PageProps<Post>) {
  const post = props.data;
  return <div class="mt-8 markdown-prose" dangerouslySetInnerHTML={{ __html: render(post.content) }} />;
}
