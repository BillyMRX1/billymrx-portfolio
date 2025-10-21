import Parser from "rss-parser";
import { cache } from "react";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: ['contentSnippet', 'content:encoded']
  }
});

const mediumFeedUrl = "https://medium.com/feed/@brilianadeputra";

const fallbackPosts: BlogPost[] = [
  {
    title: "Check out my Medium blog",
    link: "https://medium.com/@brilianadeputra",
    pubDate: new Date().toISOString(),
    contentSnippet: "Visit my Medium profile to read my latest articles about AI engineering, machine learning, and building intelligent products.",
  },
];

export const getMediumPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const feed = await parser.parseURL(mediumFeedUrl);

    const posts = (feed.items ?? []).map((item) => ({
      title: item.title ?? "No title",
      link: item.link ?? "#",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? item['content:encoded']?.replace(/<[^>]*>/g, '').substring(0, 200) ?? "",
    }));

    return posts.length > 0 ? posts : fallbackPosts;
  } catch (error) {
    console.error("Failed to fetch Medium posts", error);
    return fallbackPosts;
  }
});
