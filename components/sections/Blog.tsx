import { getMediumPosts } from "@/lib/getMediumPosts";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import SectionHeader from "@/components/ui/SectionHeader";
import BlogItem from "@/components/ui/BlogItem";

export default async function Blog() {
  const posts = await getMediumPosts();

  return (
    <section
      id="blog"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "5rem 2rem",
      }}
    >
      <FadeInWhenVisible>
        <SectionHeader
          label="Writing"
          title="From the blog."
          description="Thoughts on AI engineering, building products, and lessons from the field."
        />
      </FadeInWhenVisible>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {posts.slice(0, 6).map((post, index) => (
          <FadeInWhenVisible key={post.link} delay={index * 0.05}>
            <BlogItem
              title={post.title}
              date={post.pubDate}
              link={post.link}
              snippet={post.contentSnippet}
            />
          </FadeInWhenVisible>
        ))}
      </div>

      <FadeInWhenVisible delay={0.3}>
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <a
            href="https://medium.com/@brilianadeputra"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-read-more"
          >
            Read more on Medium →
          </a>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
