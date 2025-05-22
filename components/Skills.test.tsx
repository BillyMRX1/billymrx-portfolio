import { render, screen } from "@testing-library/react";
import Skills from "./Skills.tsx"; // Assuming .tsx extension

// Mock react-parallax-tilt
jest.mock("react-parallax-tilt", () => {
  // The Tilt component just needs to render its children for these tests
  return jest.fn(({ children }) => <div data-testid="tilt-mock">{children}</div>);
});

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    // motion.div just needs to render its children and pass props for these tests
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  },
}));

const expectedGroupedSkills = {
  "Android & Mobile": [
    { name: "Kotlin", icon: "/icons/kotlin.svg" },
    { name: "Jetpack Compose", icon: "/icons/compose.svg" },
    { name: "Java", icon: "/icons/java.svg" },
    { name: "Flutter", icon: "/icons/flutter.svg" },
    { name: "Dart", icon: "/icons/dart.svg" },
    { name: "Swift", icon: "/icons/swift.svg" },
  ],
  "AI & Backend": [
    { name: "Python", icon: "/icons/python.svg" },
    { name: "NodeJS", icon: "/icons/nodejs.svg" },
    { name: "Express.js", icon: "/icons/express.png" },
  ],
  "Web & Frontend": [
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "React Native", icon: "/icons/react.svg" },
  ],
  "Database": [
    { name: "Firebase", icon: "/icons/firebase.svg" },
    { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
  ],
  "DevOps & Tools": [
    { name: "GitHub Actions", icon: "/icons/github.svg" },
    { name: "GitLab CI", icon: "/icons/gitlab.svg" },
  ],
};

describe("Skills component", () => {
  beforeEach(() => {
    // Clear mocks
    (require("react-parallax-tilt") as jest.Mock).mockClear();
    (require("framer-motion").motion.div as jest.Mock).mockClear();
    render(<Skills />);
  });

  test("renders the main section title", () => {
    expect(screen.getByRole("heading", { name: /Skills & Tech/i, level: 2 })).toBeInTheDocument();
  });

  test("renders all category titles", () => {
    Object.keys(expectedGroupedSkills).forEach(categoryName => {
      expect(screen.getByRole("heading", { name: categoryName, level: 3 })).toBeInTheDocument();
    });
  });

  describe("renders all skills with their names and icons", () => {
    Object.entries(expectedGroupedSkills).forEach(([category, skills]) => {
      describe(`Category: ${category}`, () => {
        skills.forEach(skill => {
          test(`renders skill: ${skill.name} with its icon`, () => {
            // Check for the skill name
            expect(screen.getByText(skill.name)).toBeInTheDocument();

            // Check for the skill icon (img tag with correct src and alt)
            const imgElement = screen.getByAltText(skill.name);
            expect(imgElement).toBeInTheDocument();
            expect(imgElement).toHaveAttribute("src", skill.icon);
            expect(imgElement.tagName).toBe("IMG");
          });
        });
      });
    });
  });

  test("uses Tilt and motion.div components for skill items", () => {
    const totalSkills = Object.values(expectedGroupedSkills).flat().length;
    // Tilt is used for each skill item
    expect(require("react-parallax-tilt")).toHaveBeenCalledTimes(totalSkills);
    // motion.div is used for each category container and each skill item's inner div
    const totalCategories = Object.keys(expectedGroupedSkills).length;
    expect(require("framer-motion").motion.div).toHaveBeenCalledTimes(totalCategories + totalSkills);
  });
});
