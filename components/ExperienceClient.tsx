"use client";

import { motion } from "framer-motion";

export default function ExperienceClient() {
  const experiences = [
    {
      title: "AI Engineer",
      company: "Honda",
      date: "May 2025 - Present",
      description:
        "Developing AI-driven solutions, leveraging machine learning models, NLP, and cloud infrastructure.",
    },
    {
      title: "Mobile Developer",
      company: "MMS Group Indonesia",
      date: "Sep 2023 - Jan 2025",
      description:
        "Built and maintained cross-platform apps using React Native and CI/CD pipelines, enhancing internal tools and processes.",
    },
    {
      title: "Android Engineer",
      company: "Gravel",
      date: "Oct 2022 - Sep 2023",
      description:
        "Built Android apps using Kotlin, created an innovative design system, and streamlined development processes.",
    },
    {
      title: "Android Developer",
      company: "Vision+",
      date: "Sep 2021 - Oct 2022",
      description:
        "Led the integration of Dolby Vision and Dolby Atmos, optimizing app performance and user experience.",
    },
    {
      title: "Flutter Developer (Part-Time)",
      company: "Garapin",
      date: "Aug 2021 - Feb 2023",
      description:
        "Developed cross-platform apps for Android and iOS using Flutter and expanded platform accessibility with Next.js.",
    },
  ];

  return (
    <section className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon mb-10 text-center">
        Experience
      </h1>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="border border-neon bg-black/30 rounded-lg p-6 shadow-[0_0_12px_#00ffff80] hover:shadow-[0_0_20px_#00ffffaa] transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-neon">
              {exp.title}
            </h3>
            <h4 className="text-sm sm:text-base text-gray-400 font-medium">
              {exp.company}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 italic mb-2">
              {exp.date}
            </p>
            <p className="text-sm text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}