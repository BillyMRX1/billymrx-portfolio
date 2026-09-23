import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string().url().optional(),
  category: z.string(),
  type: z.enum(["personal", "work", "freelance", "academic"]).optional(),
  tech: z.string().optional(), // Comma-separated tech stack
  // Optional mini case-study fields (verified, factual statements only).
  problem: z.string().optional(),
  approach: z.string().optional(),
  evidence: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectType = "personal" | "work" | "freelance" | "academic";

// Ownership label shown on project cards, derived from `type`. `freelance`
// intentionally has no label: no shipped project should use that type
// (see content/projects/mobile/garapin.mdx, which is a part-time employee
// role and uses `work`).
export const OWNERSHIP_LABELS: Partial<Record<ProjectType, string>> = {
  personal: "Personal project",
  work: "Built as employee",
  academic: "Academic project",
};

export function getOwnershipLabel(type?: ProjectType): string | undefined {
  if (!type) return undefined;
  return OWNERSHIP_LABELS[type];
}

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

        // Validate frontmatter with Zod
        const validatedData = ProjectSchema.parse({
          ...data,
          category: data.category ?? category,
        });

        return validatedData;
      });

    result[category] = projects;
  }

  return result;
});
