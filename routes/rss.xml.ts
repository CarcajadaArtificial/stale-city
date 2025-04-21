import { cdata, Channel, generateRSS, Item } from "@taga3s/rss-generator";
import { define, fetchPosts } from "../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const { origin } = ctx.url;
    const blogUrl = origin;
    const path = "./data/posts";

    try {
      const extractedFiles = await fetchPosts(path);

      const channel: Channel = {
        title: "Stale City",
        link: "https://stalecity.net",
        description: cdata(
          "These are a collection of my thoughts, here you may find things that I plan, that I dream about, or even things I'm actively working on. Maybe a future project or feature, or maybe it's just a point I'm trying to make. In a way all thoughts are different.",
        ),
        ttl: 60,
        language: "en",
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
        copyright: `Copyright © ${new Date().getFullYear()} Stale City`,
      };

      const items: Item[] = extractedFiles
        .sort((a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
        )
        .map((extractedFile) => ({
          title: extractedFile.title,
          description: extractedFile.snippet,
          link: `${blogUrl}/posts/${extractedFile.file_name}`,
          guid: {
            isPermaLink: true,
            value: `${blogUrl}/posts/${extractedFile.file_name}`,
          },
          pubDate: new Date(String(extractedFile.published_at)).toUTCString(),
        }));

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
