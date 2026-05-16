import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import ContactForm from "@/components/ContactForm";

const contactLinks = [
  {
    icon: "✉",
    label: "Email",
    href: "mailto:brilianadeputra@gmail.com",
  },
  {
    icon: "in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/brilianap",
  },
  {
    icon: "gh",
    label: "GitHub",
    href: "https://github.com/BillyMRX1",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[var(--bg)] py-section-y-lg px-gutter"
    >
      <div className="mx-auto max-w-apple text-center">
        <FadeInWhenVisible>
          <span className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            CONTACT
          </span>
          <h2 className="mt-6 text-balance text-[clamp(40px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
            I&apos;m open to new opportunities, collaborations, and interesting
            conversations.
          </p>
        </FadeInWhenVisible>

        {/* Glass pills row */}
        <FadeInWhenVisible>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-2.5 text-[15px] font-medium text-[var(--text)] backdrop-blur-[20px] backdrop-saturate-150 transition-all duration-[var(--dur-base)] ease-apple hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--separator)] text-[11px] font-semibold">
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* "or" divider */}
        <FadeInWhenVisible>
          <div className="mx-auto mt-16 flex max-w-md items-center gap-6">
            <div className="h-px flex-1 bg-[var(--separator)]" />
            <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--separator)]" />
          </div>
        </FadeInWhenVisible>

        {/* Inline form */}
        <FadeInWhenVisible>
          <div className="mx-auto mt-16 max-w-md text-left">
            <ContactForm />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
