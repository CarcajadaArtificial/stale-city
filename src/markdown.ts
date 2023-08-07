import { extract } from 'std/encoding/front_matter.ts';
import { join } from 'std/path/mod.ts';

export interface MarkdownEssentials<T> {
  slug: string;
  content: string;
  attrs: T;
}

export async function getMarkdown<T>(
  path: string,
  slug: string,
): Promise<MarkdownEssentials<T> | null> {
  try {
    const text = await Deno.readTextFile(
      join(path, `${slug}.md`),
    );
    const { attrs, body } = extract<T>(text);

    return {
      slug: slug,
      content: body,
      attrs: attrs as T,
    };
  } catch {
    return null;
  }
}

export async function getMarkdowns<T>(
  path: string,
  getMarkdownCallback: (
    slug: string,
  ) => Promise<MarkdownEssentials<T> | null>,
  markdownCompareFn?: (
    a: MarkdownEssentials<T>,
    b: MarkdownEssentials<T>,
  ) => number,
): Promise<MarkdownEssentials<T>[]> {
  const files = Deno.readDir(path);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace('.md', '');
    promises.push(getMarkdownCallback(slug));
  }
  const posts = await Promise.all(promises) as MarkdownEssentials<T>[];
  posts.sort(markdownCompareFn);
  return posts;
}

export const fetchMarkdown = async (
  path: string,
): Promise<string> =>
  await (await fetch(new URL(path, import.meta.url)))
    .text();
