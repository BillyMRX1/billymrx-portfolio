"use client";

const socialLinks = [
  { href: "https://github.com/BillyMRX1", label: "GitHub" },
  { href: "https://www.linkedin.com/in/brilianap", label: "LinkedIn" },
  { href: "https://medium.com/@brilianadeputra", label: "Medium" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] px-8 py-10 bg-[var(--bg)]">
      <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.8rem] text-[var(--text-secondary)]">
          © {year} Brilian Ade Putra. All rights reserved.
        </p>

        <div className="flex gap-6">
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
      className="text-[0.8rem] text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--accent)]"
    >
      {label}
    </a>
  );
}
