"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-sm border-b border-neon"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-neon">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            BillyMRX
          </motion.span>
        </Link>

        {/* Mobile toggle */}
        <div className="sm:hidden">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-neon" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-neon" />
            )}
          </motion.button>
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-6 text-sm">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative transition ${
                  isActive(link.href)
                    ? "text-neon"
                    : "text-gray-300 hover:text-neon"
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  {link.label}
                </motion.span>
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden px-6 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`transition ${
                      isActive(link.href)
                        ? "text-neon"
                        : "text-gray-300 hover:text-neon"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
