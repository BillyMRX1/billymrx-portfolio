"use client";

const socialLinks = [
  { href: "https://github.com/BillyMRX1", label: "GitHub" },
  { href: "https://www.linkedin.com/in/brilianap", label: "LinkedIn" },
  { href: "https://medium.com/@brilianadeputra", label: "Medium" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2.5rem 2rem",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          © {year} Brilian Ade Putra. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {socialLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "var(--text-secondary)",
        textDecoration: "none",
        fontSize: "0.8rem",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")
      }
    >
      {label}
    </a>
  );
}
