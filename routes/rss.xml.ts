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
  managingEditor: "https://github.com/CarcajadaArtificial (Poncho)",
  webMaster: "https://github.com/CarcajadaArtificial (Poncho)",
  generator: "Deno Fresh Lunchbox",
  copyright: `Copyright © ${new Date().getFullYear()} Stale City`,
};

const postsToRssItems = (posts: iPost[]): Item[] =>
  posts
    .sort((a, b) =>
      new Date(b.metadata.published_at).getTime() -
      new Date(a.metadata.published_at).getTime()
    )
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
