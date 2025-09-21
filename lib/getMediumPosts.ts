import Parser from "rss-parser";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const parser = new Parser();
const mediumFeedUrl = "https://medium.com/feed/@brilianadeputra";

export async function getMediumPosts(): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL(mediumFeedUrl);

    return (feed.items ?? []).map((item) => ({
      title: item.title ?? "No title",
      link: item.link ?? "#",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
    }));
  } catch (error) {
    console.error("Failed to fetch Medium posts", error);
    return [];
  }
}
