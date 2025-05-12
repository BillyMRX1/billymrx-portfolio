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
        I'm <span className="text-neon font-semibold">BillyMRX</span> — a
        passionate developer who started out building Android apps and has now
        transitioned into AI engineering.
      </p>
      <p className="mb-4">
        I’ve developed mobile apps using Kotlin, Jetpack Compose, and Flutter,
        and now I build AI-driven experiences with OpenAI, Next.js, FastAPI, and
        more.
      </p>
      <p>
        I'm obsessed with clean design, automation, and tools that feel like
        sci-fi. Let’s build something cool.
      </p>
    </div>
  );
}
