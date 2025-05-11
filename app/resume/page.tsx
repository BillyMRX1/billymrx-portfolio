"use client";

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-28 px-8 text-center">
      <h1 className="text-4xl font-bold text-neon mb-6">Resume</h1>

      <a
        href="/resume.pdf"
        download
        className="inline-block px-6 py-3 rounded border border-neon text-neon font-semibold hover:bg-neon hover:text-black transition"
      >
        Download Resume
      </a>

      {/* Optional: Embed preview */}
      <div className="mt-10">
        <iframe
          src="/resume.pdf"
          width="100%"
          height="600"
          className="rounded border border-neon"
        ></iframe>
      </div>
    </div>
  );
}
