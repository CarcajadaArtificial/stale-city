import { cdata, Channel, generateRSS, Item } from "@taga3s/rss-generator";
import { render } from "@deno/gfm";
import { define, fetchPosts, iPost } from "../utils.ts";

const blogUrl = "https://stalecity.net";

const channel: Channel = {
  title: "Stale City",
  link: blogUrl,
  description: cdata(
    "feedId:137022670373136384+userId:135884541796544512",
  ),
  ttl: 60,
  language: "en-us",
  category: [
    "technology",
    "programming",
    "development",
    "frontend",
    "design",
    "uiux",
    "blog",
    "newsletter",
  ],
  docs: "https://www.rssboard.org/rss-specification",
  image: {
    url: `${blogUrl}/favicon/web-app-manifest-512x512.png`,
    title: "Stale City",
    link: blogUrl,
  },
  managingEditor: "blog@stalecity.net (Poncho)",
  webMaster: "blog@stalecity.net (Poncho)",
  generator: "Deno Fresh Lunchbox",
  copyright: `Copyright © ${new Date().getFullYear()} Stale City`,
};

const postsToRssItems = (posts: iPost[]): Item[] => {
  const postItems = posts
    .map((post) => ({
      title: post.metadata.title,
      description: cdata(post.metadata.snippet),
      link: `${blogUrl}/posts/${post.file_name}`,
      guid: {
        isPermaLink: true,
        value: `${blogUrl}/posts/${post.file_name}`,
      },
      content: {
        encoded: cdata(render([
          post.content,
          ...post.comments.map((comment) => +comment.content),
        ].join("\n"))),
      },
      comments: `${blogUrl}/posts/${post.file_name}#comments`,
      enclousure: post.metadata.vignette
        ? {
          url: `${blogUrl}/images/${post.metadata.vignette}.png`,
          type: "image/png",
        }
        : undefined,
      pubDate: new Date(String(post.metadata.published_at))
        .toUTCString(),
    }));

  const commentItems = posts.map((post) =>
    post.comments.map((comment) => ({ comment: comment, post: post }))
  ).flat().map((comment) => ({
    title: `Update: ${comment.post.metadata.title}`,
    description: cdata(comment.comment.content),
    link: `${blogUrl}/posts/${comment.post.file_name}#${
      comment.comment.file_name.replace(/\.md$/, "")
    }`,
    guid: {
      isPermaLink: true,
      value: `${blogUrl}/posts/${comment.post.file_name}#${
        comment.comment.file_name.replace(/\.md$/, "")
      }`,
    },
    pubDate: new Date(String(comment.comment.metadata.published_at))
      .toUTCString(),
  }));

  return [...postItems, ...commentItems].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );
};

export const handler = define.handlers({
  async GET() {
    const path = "./data/posts";

    try {
      const items = postsToRssItems(await fetchPosts(path));

      const xml = generateRSS({ channel, items });
      const data = new TextEncoder().encode(xml);

      return new Response(data, {
        headers: {
          "Content-Type": "application/rss+xml; charset=utf-8",
        },
      });
    } catch (error) {
      console.error("Error generating RSS feed:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});
