"use client";

import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ContactForm";

const contactLinks = [
  {
    icon: "✉",
    label: "brilianadeputra@gmail.com",
    href: "mailto:brilianadeputra@gmail.com",
  },
  {
    icon: "in",
    label: "linkedin.com/in/brilianap",
    href: "https://www.linkedin.com/in/brilianap",
  },
  {
    icon: "gh",
    label: "github.com/BillyMRX1",
    href: "https://github.com/BillyMRX1",
  },
];

export default function Contact() {
  return (
    <div style={{ background: "var(--bg-alt)" }} id="contact">
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <FadeInWhenVisible>
          <SectionHeader
            label="Contact"
            title="Let's build something together."
            description="I'm open to new opportunities, collaborations, and interesting conversations."
          />
        </FadeInWhenVisible>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          <FadeInWhenVisible>
            <div>
              <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: 1.8 }}>
                Whether you have a project in mind, want to talk AI engineering, or just want
                to say hello, my inbox is always open.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {contactLinks.map((link) => (
                  <ContactLink key={link.href} {...link} />
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.15}>
            <ContactForm />
          </FadeInWhenVisible>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}

function ContactLink({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.875rem",
        color: "var(--text-secondary)",
        textDecoration: "none",
        fontSize: "0.9rem",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")
      }
    >
      <span
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}
