import { extractYaml } from "@std/front-matter";
import { join } from "@std/path";

export const mdFetch = async (url: string) =>
  (await fetch(new URL(url, import.meta.url))).text();

export function fileArrayFromDirectory(path: string) {
  const posts = [];
  for (const entry of Deno.readDirSync(path)) {
    if (entry.isFile) {
      posts.push(entry);
    }
  }

  return posts;
}

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
      join(path, `${slug}`),
    );
    const { attrs, body } = extractYaml<T>(text);

    return {
      slug: slug,
      content: body,
      attrs: attrs as T,
    };
  } catch {
    return null;
  }
}

export interface Post {
  title: string;
  published_at: Date;
  last_edited_at: Date;
  snippet: string;
}

export interface MdTimelineEvent {
  title: string;
  period: string;
  role: string;
  summary: string;
  tags: string[];
}
