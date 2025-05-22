import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsClient, { Project } from "./ProjectsClient";

// Mock HologramCard
jest.mock("./HologramCard", () => {
  return function DummyHologramCard({ title, description }: { title: string; description: string }) {
    return (
      <div data-testid="hologram-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
});

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>), // Simplifies motion.div to a regular div
  },
  AnimatePresence: jest.fn(({ children }) => <div data-testid="animate-presence">{children}</div>), // Simplifies AnimatePresence
}));

const mockProjectsData: Record<string, Project[]> = {
  Web: [
    { title: "Web Project 1", description: "Description for web 1", category: "Web", type: "personal" },
    { title: "Web Project 2", description: "Description for web 2", category: "Web", type: "work" },
  ],
  Mobile: [
    { title: "Mobile Project 1", description: "Description for mobile 1", category: "Mobile", type: "freelance" },
  ],
  AI: [], // Category with no projects
};

describe("ProjectsClient component", () => {
  beforeEach(() => {
    // Clear mocks
    (require("framer-motion").motion.div as jest.Mock).mockClear();
    (require("framer-motion").AnimatePresence as jest.Mock).mockClear();
  });

  test("renders category tabs correctly", () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    expect(screen.getByRole("button", { name: "Web" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mobile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AI" })).toBeInTheDocument();
  });

  test("renders projects for the initially active category (first category)", () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    // Web is the first category
    expect(screen.getByText("Web Project 1")).toBeInTheDocument();
    expect(screen.getByText("Description for web 1")).toBeInTheDocument();
    expect(screen.getByText("Web Project 2")).toBeInTheDocument();
    expect(screen.getByText("Description for web 2")).toBeInTheDocument();

    // Check that projects from other categories are not rendered
    expect(screen.queryByText("Mobile Project 1")).toBeNull();
  });

  test("changes displayed projects when a different category tab is clicked", async () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    
    // Initially Web projects are shown
    expect(screen.getByText("Web Project 1")).toBeInTheDocument();
    expect(screen.queryByText("Mobile Project 1")).toBeNull();

    // Click on the Mobile tab
    const mobileTabButton = screen.getByRole("button", { name: "Mobile" });
    await userEvent.click(mobileTabButton);

    // Now Mobile projects should be shown
    expect(screen.getByText("Mobile Project 1")).toBeInTheDocument();
    expect(screen.getByText("Description for mobile 1")).toBeInTheDocument();

    // Web projects should not be visible
    expect(screen.queryByText("Web Project 1")).toBeNull();
  });

  test("renders no projects if the active category has no projects", async () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    
    const aiTabButton = screen.getByRole("button", { name: "AI" });
    await userEvent.click(aiTabButton);

    // Check that no HologramCard components are rendered (by checking for their content)
    expect(screen.queryByTestId("hologram-card")).toBeNull();
    expect(screen.queryByText("Web Project 1")).toBeNull();
    expect(screen.queryByText("Mobile Project 1")).toBeNull();
  });
  
  test("applies correct styling to active and inactive tabs", async () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    const webTab = screen.getByRole("button", { name: "Web" });
    const mobileTab = screen.getByRole("button", { name: "Mobile" });

    // Initially Web is active
    expect(webTab).toHaveClass("border-neon text-neon shadow-[0_0_12px_#00ffff]");
    expect(mobileTab).toHaveClass("border-gray-600 text-gray-400");
    expect(mobileTab).not.toHaveClass("border-neon text-neon shadow-[0_0_12px_#00ffff]");


    // Click Mobile tab
    await userEvent.click(mobileTab);
    expect(mobileTab).toHaveClass("border-neon text-neon shadow-[0_0_12px_#00ffff]");
    expect(webTab).toHaveClass("border-gray-600 text-gray-400");
    expect(webTab).not.toHaveClass("border-neon text-neon shadow-[0_0_12px_#00ffff]");
  });

  test("uses AnimatePresence and motion.div for transitions", () => {
    render(<ProjectsClient allProjects={mockProjectsData} />);
    expect(require("framer-motion").AnimatePresence).toHaveBeenCalled();
    // motion.div is called for the main container and each project card
    // Initial render: 1 for container + N for projects in the first tab
    const initialProjectsCount = mockProjectsData[Object.keys(mockProjectsData)[0]].length;
    expect(require("framer-motion").motion.div).toHaveBeenCalledTimes(1 + initialProjectsCount);
  });
});
