import { extract } from 'std/encoding/front_matter.ts';
import { join } from 'std/path/mod.ts';

export interface Post {
  slug: string;
  title: string;
  published_at: Date;
  last_edited_at: Date;
  snippet: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir('./data/posts');
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace('.md', '');
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(
      join('./data/posts', `${slug}.md`),
    );
    const { attrs, body } = extract<Post>(text);

    return {
      slug,
      title: attrs.title as string,
      published_at: new Date(attrs.published_at as Date),
      last_edited_at: new Date(attrs.last_edited_at as Date),
      content: body,
      snippet: attrs.snippet as string || '',
    };
  } catch {
    return null;
  }
}
