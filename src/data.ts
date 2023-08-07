import { extract } from 'std/encoding/front_matter.ts';
import { join } from 'std/path/mod.ts';

export interface Post {
  slug: string;
  title: string;
  published_at: Date;
  snippet: string;
  content: string;
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
      content: body,
      snippet: attrs.snippet as string || '',
    };
  } catch {
    return null;
  }
}
