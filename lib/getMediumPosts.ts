import { cache } from "react";

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

const mediumFeedUrl = "https://medium.com/feed/@brilianadeputra";

const fallbackPosts: BlogPost[] = [
  {
    title: "Check out my Medium blog",
    link: "https://medium.com/@brilianadeputra",
    pubDate: new Date().toISOString(),
    contentSnippet: "Visit my Medium profile to read my latest articles about AI engineering, machine learning, and building intelligent products.",
  },
];

// Minimal RSS 2.0 extraction. Medium wraps values in CDATA; strip it,
// then decode the handful of entities that survive.
const tagContent = (xml: string, tag: string): string => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  return m[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, "$1").trim();
};

const decodeEntities = (s: string): string =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const toSnippet = (html: string): string =>
  decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);

export const getMediumPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const res = await fetch(mediumFeedUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Medium feed responded ${res.status}`);
    const xml = await res.text();

    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
      title: decodeEntities(tagContent(item, "title")) || "No title",
      link: tagContent(item, "link") || "#",
      pubDate: tagContent(item, "pubDate"),
      contentSnippet: toSnippet(tagContent(item, "content:encoded")),
    }));

    return posts.length > 0 ? posts : fallbackPosts;
  } catch (error) {
    console.error("Failed to fetch Medium posts", error);
    return fallbackPosts;
  }
});
