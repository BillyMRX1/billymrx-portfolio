"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://github.com/BillyMRX1",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/brilianap",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/BillyMRX1",
    icon: FaTwitter,
    label: "Twitter",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/30 backdrop-blur-sm border-t border-neon mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold text-neon mb-4">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-neon transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-neon mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-neon transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-neon mb-4">About</h3>
            <p className="text-gray-400 text-sm mb-2">
              Brilian Ade Putra (Billy)
            </p>
            <p className="text-gray-400 text-sm">AI Engineer at Honda Japan</p>
            <p className="text-gray-400 text-xs mt-2">Tokyo, Japan</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {currentYear} Brilian Ade Putra. All rights reserved.
          </p>
          <motion.p
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Made with{" "}
            <span className="text-neon">Next.js</span> and{" "}
            <span className="text-neon">❤</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
