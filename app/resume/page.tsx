"use client";

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon mb-6">Resume</h1>

      <p className="text-sm text-gray-400 mb-6">
        Download my resume or preview below.
      </p>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 border border-neon text-neon rounded-md hover:bg-neon hover:text-black transition"
      >
        View Resume PDF
      </a>

      <div className="mt-8 w-full aspect-[3/4]">
        <iframe
          src="/resume.pdf"
          className="w-full h-full rounded border border-neon"
          title="BillyMRX Resume"
        />
      </div>
    </div>
  );
}
