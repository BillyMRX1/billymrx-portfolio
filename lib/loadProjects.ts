import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  title: string;
  description: string;
  link: string;
  category: string;
};

export async function getAllProjects(): Promise<Record<string, Project[]>> {
  const basePath = path.join(process.cwd(), "content/projects");
  const categories = fs.readdirSync(basePath);

  const result: Record<string, Project[]> = {};

  for (const category of categories) {
    const dir = path.join(basePath, category);
    const files = fs.readdirSync(dir);

    const projects = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title,
        description: data.description,
        link: data.link,
        category: data.category,
        type: data.type,
      };
    });

    result[category] = projects;
  }

  return result;
}
