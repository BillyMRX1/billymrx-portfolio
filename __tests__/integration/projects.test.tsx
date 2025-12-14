import { getAllProjects } from '@/lib/loadProjects';

describe('Projects Page Integration', () => {
  it('loads all projects successfully', async () => {
    const projects = await getAllProjects();

    // Verify we have projects in different categories
    expect(Object.keys(projects).length).toBeGreaterThan(0);
  });

  it('loads machine learning projects', async () => {
    const projects = await getAllProjects();
    const mlProjects = projects['machine-learning'];

    expect(mlProjects).toBeDefined();
    expect(mlProjects.length).toBeGreaterThan(0);

    // Check that each project has required fields
    mlProjects.forEach(project => {
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.category).toBeDefined();
    });
  });

  it('loads mobile projects', async () => {
    const projects = await getAllProjects();
    const mobileProjects = projects['mobile'];

    expect(mobileProjects).toBeDefined();
    expect(mobileProjects.length).toBeGreaterThan(0);

    // Check that each project has required fields
    mobileProjects.forEach(project => {
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.category).toBeDefined();
    });
  });

  it('validates project data with Zod schema', async () => {
    const projects = await getAllProjects();

    // This test will fail if Zod validation fails during getAllProjects
    // which means our schema is working correctly
    Object.values(projects).forEach(categoryProjects => {
      categoryProjects.forEach(project => {
        // Check basic structure
        expect(typeof project.title).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.category).toBe('string');

        // Check optional fields if present
        if (project.link) {
          expect(typeof project.link).toBe('string');
        }
        if (project.type) {
          expect(['personal', 'work', 'freelance', 'academic']).toContain(project.type);
        }
        if (project.tech) {
          expect(typeof project.tech).toBe('string');
        }
      });
    });
  });
});
