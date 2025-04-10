import { extractYaml } from "@std/front-matter";
import { timeAgo } from "@egamagz/time-ago";
import { join } from "@std/path";

export interface iPost {
  title: string;
  published_at: string;
  time_ago: string;
  snippet: string;
  file_name: string;
  content: string;
}

export async function fetchPost(path: string): Promise<iPost> {
  const fileData = extractYaml<Omit<iPost, "content" | "time_ago">>(
    await Deno.readTextFile(path),
  );

  const content = fileData.body;
  const attrs = fileData.attrs;
  const time_ago = timeAgo(new Date(attrs.published_at));

  return ({
    ...attrs,
    file_name: path.substring(path.lastIndexOf("/") + 1),
    time_ago: time_ago ? time_ago : "Unknown time ago",
    content,
  });
}

export async function fetchPosts(dir: string): Promise<iPost[]> {
  const postFiles = await Deno.readDir(dir);
  const posts = [];

  for await (const file of postFiles) {
    if (file.name.endsWith(".md")) {
      posts.push(await fetchPost(join(dir, file.name)));
    }
  }

  return posts;
}
