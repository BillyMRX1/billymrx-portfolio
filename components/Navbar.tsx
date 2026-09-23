"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/lib/scrollToSection";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

const ctaLink = { label: "Discuss a project", href: "#contact" };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = "primary-mobile-menu";
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("#", "");
    scrollToSection(id);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

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
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} onClick={handleNavClick} />
            ))}
            <a
              href={ctaLink.href}
              onClick={(e) => handleNavClick(e, ctaLink.href)}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-[0.8rem] font-medium text-white no-underline transition-colors duration-200 hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              {ctaLink.label}
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls={menuId}
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
            id={menuId}
            className="flex md:hidden flex-col gap-2 border-t border-[var(--separator)] bg-[var(--glass-bg)] px-8 py-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 text-base font-medium text-[var(--text-secondary)] no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaLink.href}
              onClick={(e) => handleNavClick(e, ctaLink.href)}
              className="mt-1 mb-2 inline-flex w-fit items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-[0.9rem] font-medium text-white no-underline"
            >
              {ctaLink.label}
            </a>
          </div>
        )}
      </nav>
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
