import Parser from "rss-parser";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

export async function getMediumPosts(): Promise<BlogPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(
    "https://medium.com/feed/@brilianadeputra"
  );

  return feed.items.map((item) => ({
    title: item.title ?? "No title",
    link: item.link ?? "#",
    pubDate: item.pubDate ?? "",
    contentSnippet: item.contentSnippet ?? "",
  }));
}
