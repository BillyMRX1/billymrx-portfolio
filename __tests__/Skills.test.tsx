import { skillCategories } from '@/lib/skills';

describe('Skills Data', () => {
  it('has valid skill categories structure', () => {
    expect(skillCategories).toBeDefined();
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it('each category has a title and skills', () => {
    skillCategories.forEach(category => {
      expect(category.title).toBeDefined();
      expect(typeof category.title).toBe('string');
      expect(Array.isArray(category.skills)).toBe(true);
      expect(category.skills.length).toBeGreaterThan(0);
    });
  });

  it('each skill has a name and icon', () => {
    skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        expect(skill.name).toBeDefined();
        expect(typeof skill.name).toBe('string');
        expect(skill.icon).toBeDefined();
        expect(typeof skill.icon).toBe('string');
        expect(skill.icon).toMatch(/\.svg$/);
      });
    });
  });

  it('includes expected categories', () => {
    const categoryTitles = skillCategories.map(c => c.title);
    expect(categoryTitles).toContain('AI & Machine Learning');
    expect(categoryTitles).toContain('Full Stack Engineering');
    expect(categoryTitles).toContain('Mobile Development');
  });
});
