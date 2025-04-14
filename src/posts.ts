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
  const parts = path.split("/");

  return {
    ...attrs,
    file_name: parts[parts.length - 2],
    time_ago: time_ago ? time_ago : "Unknown time ago",
    content,
  };
}

export async function fetchPosts(dir: string): Promise<iPost[]> {
  const postDirs = await Deno.readDir(dir);
  const posts = [];

  for await (const entry of postDirs) {
    if (entry.isDirectory) {
      const filePath = join(dir, entry.name, "post.md");
      posts.push(await fetchPost(filePath));
    }
  }

  return posts;
}
