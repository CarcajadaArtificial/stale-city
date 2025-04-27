import { extractYaml } from "@std/front-matter";
import { exists } from "jsr:@std/fs/exists";
import { timeAgo } from "@egamagz/time-ago";
import { join } from "@std/path";
import readingTime from "npm:reading-time";

export interface iPostMetadata {
  title: string;
  published_at: string;
  snippet: string;
  vignette: string;
}

export interface iCommentMetadata {
  published_at: string;
}

export interface iComment {
  metadata: iCommentMetadata;
  file_name: string;
  time_ago: string;
  content: string;
}

export interface iPost {
  metadata: iPostMetadata;
  file_name: string;
  readingMinutes: number;
  time_ago: string;
  content: string;
  comments: iComment[];
}

async function fetchComments(postPath: string): Promise<iComment[]> {
  const commentsDir = join(postPath, "comments");
  if (!await exists(commentsDir)) return [];

  const comments: iComment[] = [];
  for await (const entry of Deno.readDir(commentsDir)) {
    if (!entry.isFile || !entry.name.endsWith(".md")) continue;
    const commentPath = join(commentsDir, entry.name);
    const fileData = extractYaml<iCommentMetadata>(
      await Deno.readTextFile(commentPath),
    );
    const metadata = fileData.attrs;
    const content = fileData.body;
    comments.push({
      metadata,
      file_name: entry.name,
      time_ago: timeAgo(new Date(metadata.published_at)) || "unknown time ago",
      content,
    });
  }
  return comments;
}

export async function fetchPost(path: string): Promise<iPost> {
  const fileData = extractYaml<iPostMetadata>(
    await Deno.readTextFile(path),
  );
  const metadata = fileData.attrs;
  const content = fileData.body;
  const parts = path.split("/");
  const comments = await fetchComments(
    parts.slice(0, parts.length - 1).join("/"),
  );

  return {
    metadata,
    file_name: parts[parts.length - 2],
    readingMinutes: readingTime(content).minutes,
    time_ago: timeAgo(new Date(metadata.published_at)) || "unknown time ago",
    content,
    comments,
  };
}

export async function fetchPosts(dir: string): Promise<iPost[]> {
  const postDirs = await Deno.readDir(dir);
  const posts: iPost[] = [];

  for await (const entry of postDirs) {
    if (!entry.isDirectory) continue;
    const filePath = join(dir, entry.name, "post.md");
    posts.push(await fetchPost(filePath));
  }

  return posts;
}
