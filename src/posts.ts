import { extractYaml } from "@std/front-matter";
import { exists } from "jsr:@std/fs/exists";
import { timeAgo } from "@egamagz/time-ago";
import { join } from "@std/path";
import readingTime from "npm:reading-time";

export interface iPost {
  title: string;
  published_at: string;
  time_ago: string;
  snippet: string;
  readingMinutes: number;
  file_name: string;
  content: string;
  comments: iComment[];
}

export interface iComment {
  published_at: string;
  time_ago: string;
  file_name: string;
  content: string;
}

async function fetchComments(postPath: string): Promise<iComment[]> {
  const commentsDir = join(postPath, "comments");
  if (!await exists(commentsDir)) return [];

  const comments: iComment[] = [];
  for await (const entry of Deno.readDir(commentsDir)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      const commentPath = join(commentsDir, entry.name);
      const fileData = extractYaml<Omit<iComment, "content" | "time_ago">>(
        await Deno.readTextFile(commentPath),
      );
      const content = fileData.body;
      const attrs = fileData.attrs;
      comments.push({
        ...attrs,
        file_name: entry.name,
        time_ago: timeAgo(new Date(attrs.published_at)) || "unknown time ago",
        content,
      });
    }
  }
  return comments;
}

export async function fetchPost(path: string): Promise<iPost> {
  const fileData = extractYaml<
    Omit<iPost, "content" | "time_ago" | "comments">
  >(
    await Deno.readTextFile(path),
  );
  const content = fileData.body;
  const attrs = fileData.attrs;
  const parts = path.split("/");
  const comments = await fetchComments(
    parts.slice(0, parts.length - 1).join("/"),
  );
  return {
    ...attrs,
    file_name: parts[parts.length - 2],
    readingMinutes: readingTime(content).minutes,
    time_ago: timeAgo(new Date(attrs.published_at)) || "unknown time ago",
    content,
    comments,
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
