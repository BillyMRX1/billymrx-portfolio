export const revalidate = 3600;
export const dynamic = "force-dynamic";

import { getMediumPosts } from "@/lib/getMediumPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read latest articles and insights by Brilian Ade Putra (Billy) on AI engineering, mobile development, and software engineering. Medium posts about technology and career growth.",
  keywords: [
    "Billy Blog",
    "AI Engineering Blog",
    "Mobile Development Articles",
    "Software Engineering Insights",
    "Technology Blog",
    "Medium Articles",
    "Android Development Blog",
    "Career Growth Articles"
  ],
  openGraph: {
    title: "Blog - Brilian Ade Putra (Billy) Tech Articles & Insights",
    description: "Read the latest tech articles and professional insights from AI Engineer Brilian Ade Putra, covering mobile development, AI, and software engineering.",
  },
  twitter: {
    title: "Blog - Brilian Ade Putra (Billy) Tech Articles & Insights",
    description: "Read the latest tech articles and professional insights from AI Engineer Brilian Ade Putra, covering mobile development, AI, and software engineering.",
  },
};

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon mb-6 text-center">
        Blog
      </h1>

      <ul className="space-y-6">
        {posts.map((post, idx) => (
          <li
            key={idx}
            className="border border-neon rounded p-4 hover:shadow-[0_0_10px_#00ffffaa] transition"
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-neon hover:underline"
            >
              {post.title}
            </a>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(post.pubDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm text-gray-300">{post.contentSnippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
