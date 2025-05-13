import Skills from "@/components/Skills";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 px-8 max-w-3xl mx-auto text-gray-300 text-center">
      <img
        src="/avatar.jpg"
        alt="Profile Picture"
        className="mx-auto w-32 h-32 rounded-full border-4 border-neon shadow-[0_0_20px_#00ffff] mb-6"
      />

      <h1 className="text-4xl font-bold text-neon mb-4">BillyMRX</h1>
      <p className="text-sm text-gray-400 mb-8">
        Android Developer → AI Engineer
      </p>

      <p className="mb-4">
        I'm <span className="text-neon font-semibold">Brilian Ade Putra</span> — a passionate developer with over 3 years of experience building high-performance mobile applications using Kotlin, Jetpack Compose, and Flutter. I’ve worked on a variety of Android apps across industries including media, construction, and enterprise solutions.
      </p>
      <p className="mb-4">
        I currently work as an <span className="text-neon font-semibold">AI Engineer at Honda</span>, where I’m exploring the intersection of software engineering and artificial intelligence to develop smart, human-centered systems.
      </p>
      <p className="mb-4">
        My career spans native and cross-platform development, CI/CD automation, and backend integration, with hands-on experience using modern stacks like Next.js, FastAPI, and cloud-based infrastructure.
      </p>
      <p>
        I'm obsessed with futuristic UI, AI-powered products, and automation. Whether it's crafting sleek mobile interfaces or building intelligent backend systems, I'm always looking to push boundaries and bring ideas to life.
      </p>
      <Skills />
    </div>
  );
}
