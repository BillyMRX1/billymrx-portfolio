import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Brilian Ade Putra (Billy)'s resume - AI Engineer at Honda Japan with expertise in mobile development, AI solutions, and full-stack applications. Available for hire in Tokyo.",
  keywords: [
    "Billy Resume",
    "AI Engineer CV",
    "Mobile Developer Resume",
    "Software Engineer CV",
    "Download Resume",
    "Hire AI Engineer",
    "Tokyo Developer CV",
    "Honda Engineer Resume"
  ],
  openGraph: {
    title: "Resume - Brilian Ade Putra (Billy) AI Engineer Available for Hire",
    description: "Download the complete resume of AI Engineer Brilian Ade Putra. Extensive experience in mobile development and AI solutions. Open to opportunities in Tokyo.",
  },
  twitter: {
    title: "Resume - Brilian Ade Putra (Billy) AI Engineer Available for Hire",
    description: "Download the complete resume of AI Engineer Brilian Ade Putra. Extensive experience in mobile development and AI solutions. Open to opportunities in Tokyo.",
  },
};

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
          src="/api/resume"
          className="w-full h-full rounded border border-neon"
          title="BillyMRX Resume"
        />
      </div>
    </div>
  );
}
