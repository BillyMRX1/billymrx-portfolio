"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/lib/scrollToSection";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    scrollToSection(id);
  };

  return (
    <>
      <nav
        className="glass fixed inset-x-0 top-0 z-[100] px-8"
        aria-label="Primary"
      >
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[1.1rem] font-bold tracking-[-0.02em] text-[var(--text)] no-underline"
          >
            Brilian.
          </a>

          {/* Desktop links */}
          <div className="nav-desktop flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} onClick={handleNavClick} />
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="nav-mobile flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1"
            >
              <span
                className="block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-all duration-[250ms]"
                style={{
                  transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                className="block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-all duration-[250ms]"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-[22px] rounded-sm bg-[var(--text)] transition-all duration-[250ms]"
                style={{
                  transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="nav-mobile-menu flex flex-col gap-5 border-t border-[var(--separator)] bg-[var(--bg)] px-8 py-5"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[0.9rem] font-medium text-[var(--text-secondary)] no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({
  link,
  onClick,
}: {
  link: { label: string; href: string };
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <a
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      className="text-[0.875rem] font-medium text-[var(--text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--accent)]"
    >
      {link.label}
    </a>
  );
}
