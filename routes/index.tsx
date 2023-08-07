import { Handlers, PageProps } from "$fresh/server.ts";

export interface Post {
  slug: string;
  title: string;
  published_at: Date;
  snippet: string;
  content: string;
}

/*
export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir('./data/posts');
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace('.md', '');
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)) as Post[];
  posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join('./data/posts', `${slug}.md`));
  const { attrs, body } = extract<Post>(text);
  return {
    slug,
    title: attrs.title,
    published_at: new Date(attrs.published_at),
    content: body,
    snippet: attrs.snippet,
  };
}
 */

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    return ctx.render([]);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
    </>
  );
}
