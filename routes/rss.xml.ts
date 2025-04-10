import { stringify } from "@libs/xml/stringify";
import { define, fetchPosts } from "../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const { origin } = ctx.url;
    const currentYear = new Date().getFullYear();
    const blogUrl = origin;
    const path = "./data/posts";

    try {
      const extractedFiles = await fetchPosts(path);

      const rssObject = {
        "@version": "2.0",
        rss: {
          "@version": "2.0",
          channel: {
            title: "Stale City",
            link: blogUrl,
            description:
              "These are a collection of my thoughts, here you may find things that I plan, that I dream about, or even things I'm actively working on. Maybe a future project or feature, or maybe it's just a point I'm trying to make. In a way all thoughts are different.",
            lastBuildDate: new Date().toUTCString(),
            language: "en-us",
            copyright: `Copyright © ${currentYear} Stale City`,
            item: extractedFiles.map((extractedFile) => ({
              title: extractedFile.title,
              link: `${blogUrl}/posts/${extractedFile.file_name}`,
              guid: `${blogUrl}/posts/${extractedFile.file_name}`,
              description: extractedFile.snippet,
              pubDate: new Date(String(extractedFile.published_at))
                .toUTCString(),
            })),
          },
        },
      };

      const rssXML = stringify(rssObject, {
        format: { indent: "  " },
        replace: { entities: true },
      });

      return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${rssXML}`, {
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
