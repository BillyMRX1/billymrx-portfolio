export type Skill = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
      { name: "OpenAI", icon: "/icons/openai.svg" },
      { name: "Claude", icon: "/icons/claude.svg" },
      { name: "Azure AI", icon: "/icons/azure-ai.svg" },
      { name: "Amazon Bedrock", icon: "/icons/bedrock.svg" },
      { name: "Computer Vision", icon: "/icons/opencv.svg" },
      { name: "Jupyter", icon: "/icons/jupyter.svg" },
    ],
  },
  {
    title: "Full Stack Engineering",
    skills: [
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "React", icon: "/icons/react.svg" },
    ],
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "Kotlin", icon: "/icons/kotlin.svg" },
      { name: "Kotlin Multiplatform", icon: "/icons/kotlin.svg" },
      { name: "Jetpack Compose", icon: "/icons/compose.svg" },
      { name: "React Native", icon: "/icons/react.svg" },
      { name: "Flutter", icon: "/icons/flutter.svg" },
      { name: "Dart", icon: "/icons/dart.svg" },
      { name: "Swift", icon: "/icons/swift.svg" },
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Firebase", icon: "/icons/firebase.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "GitHub Actions", icon: "/icons/github.svg" },
      { name: "GitLab CI", icon: "/icons/gitlab.svg" },
    ],
  },
];
