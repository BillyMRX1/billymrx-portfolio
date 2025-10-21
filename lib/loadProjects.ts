import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type ProjectType = "personal" | "work" | "freelance" | "academic";

export type Project = {
  title: string;
  description: string;
  link?: string;
  category: string;
  type?: ProjectType;
};

export const getAllProjects = cache(async (): Promise<Record<string, Project[]>> => {
  const basePath = path.join(process.cwd(), "content/projects");
  const categories = fs.readdirSync(basePath);

  const result: Record<string, Project[]> = {};

  for (const category of categories) {
    const dir = path.join(basePath, category);
    const files = fs.readdirSync(dir);

    const projects = files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        const {
          title,
          description,
          link,
          category: itemCategory,
          type,
        } = data as Partial<Project> & {
          title: string;
          description: string;
          category: string;
        };

        const project = {
          title,
          description,
          link,
          category: itemCategory ?? category,
          type,
        } satisfies Project;

        return project;
      });

    result[category] = projects;
  }

  return result;
});
