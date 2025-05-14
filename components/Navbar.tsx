import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-neon">
          BillyMRX
        </Link>
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-neon transition">
            About
          </Link>
          <Link href="/projects" className="hover:text-neon transition">
            Projects
          </Link>
          <Link href="/experience" className="hover:text-neon transition">
            Experience
          </Link>
          <Link href="/resume" className="hover:text-neon transition">
            Resume
          </Link>
          <Link href="/contact" className="hover:text-neon transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
