import { getMediumPosts } from "@/lib/getMediumPosts";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import BlogItem from "@/components/ui/BlogItem";

export default async function Blog() {
  const posts = await getMediumPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 6);

  const formatDate = (d: string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  return (
    <section id="blog" className="bg-[var(--bg)] py-20 md:py-section-y lg:py-section-y-lg px-gutter">
      <div className="mx-auto max-w-apple-wide">
        <FadeInWhenVisible>
          <h2 className="text-balance text-[clamp(32px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            From the blog.
          </h2>
          <p className="mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
            Writing about AI engineering and product building, published on Medium.
          </p>
        </FadeInWhenVisible>

        {/* Featured post */}
        {featured && (
          <FadeInWhenVisible>
            <article className="mt-20">
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/featured block"
              >
                <time className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {formatDate(featured.pubDate)}
                </time>
                <h3 className="mt-4 text-balance text-[clamp(22px,3.5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] transition-colors duration-[var(--dur-base)] ease-apple group-hover/featured:text-[var(--accent)]">
                  {featured.title}
                </h3>
                {featured.contentSnippet && (
                  <p className="mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)] line-clamp-3">
                    {featured.contentSnippet}
                  </p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--accent)]">
                  Read on Medium{" "}
                  <span className="transition-transform duration-[var(--dur-base)] ease-apple group-hover/featured:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </article>
          </FadeInWhenVisible>
        )}

        {/* Rest of list */}
        {rest.length > 0 && (
          <FadeInWhenVisible>
            <ul className="mt-20 border-t border-[var(--separator)]">
              {rest.map((post) => (
                <BlogItem
                  key={post.link}
                  title={post.title}
                  date={post.pubDate}
                  link={post.link}
                  snippet={post.contentSnippet}
                />
              ))}
            </ul>
          </FadeInWhenVisible>
        )}

        <FadeInWhenVisible>
          <div className="mt-16 text-center">
            <a
              href="https://medium.com/@brilianadeputra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-[var(--accent)] hover:underline"
            >
              All posts →
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
