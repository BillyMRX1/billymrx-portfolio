import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import ContactForm from "@/components/ContactForm";

const contactLinks = [
  {
    icon: FiMail,
    label: "Email",
    href: "mailto:brilianadeputra@gmail.com",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/brilianap",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/BillyMRX1",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[var(--bg)] py-20 md:py-section-y lg:py-section-y-lg px-gutter"
    >
      <div className="mx-auto max-w-apple text-center">
        <FadeInWhenVisible>
          <h2 className="text-balance text-[clamp(32px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
            Hiring, collaborating, or curious about something I built? My inbox
            is open.
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
                <link.icon aria-hidden="true" size={16} strokeWidth={1.75} />
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
