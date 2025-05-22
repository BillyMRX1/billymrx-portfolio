import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Terminal from "./Terminal"; // Assuming .tsx if not specified

describe("Terminal component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  // Test Suite for Rendering
  describe("Rendering", () => {
    test("does not render when visible is false", () => {
      render(<Terminal visible={false} onClose={mockOnClose} />);
      expect(screen.queryByText("~/billymrx-terminal")).toBeNull();
    });

    test("renders correctly when visible is true", () => {
      render(<Terminal visible={true} onClose={mockOnClose} />);
      expect(screen.getByText("~/billymrx-terminal")).toBeInTheDocument(); // Title bar
      expect(screen.getByText("BillyMRX Terminal [Cyberpunk Edition]")).toBeInTheDocument(); // Initial line
      expect(screen.getByText("Type `help` for a list of commands.")).toBeInTheDocument(); // Initial line
      expect(screen.getByRole("textbox")).toBeInTheDocument(); // Input field
      expect(screen.getByText("×")).toBeInTheDocument(); // Close button
    });

    test("input field is focused on render when visible", () => {
      render(<Terminal visible={true} onClose={mockOnClose} />);
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  // Test Suite for Command Execution
  describe("Command Execution", () => {
    const testCases = [
      {
        command: "help",
        expectedOutput: "Available commands: whoami, projects, clear",
      },
      {
        command: "whoami",
        expectedOutput: "Android Dev turned AI Engineer — BillyMRX.",
      },
      {
        command: "projects",
        expectedOutput: "Navigate to /projects to view portfolio.",
      },
      {
        command: "unknowncmd",
        expectedOutput: "Command not found: unknowncmd",
      },
    ];

    testCases.forEach(({ command, expectedOutput }) => {
      test(`handles '${command}' command correctly`, async () => {
        render(<Terminal visible={true} onClose={mockOnClose} />);
        const inputField = screen.getByRole("textbox");

        await userEvent.type(inputField, command);
        await userEvent.keyboard("{enter}");

        expect(screen.getByText(`$ ${command}`)).toBeInTheDocument(); // Check command echo
        expect(screen.getByText(expectedOutput)).toBeInTheDocument(); // Check command output
        expect(inputField).toHaveValue(""); // Input should clear
      });
    });

    test("handles 'clear' command correctly", async () => {
      render(<Terminal visible={true} onClose={mockOnClose} />);
      const inputField = screen.getByRole("textbox");

      // Add some lines first
      await userEvent.type(inputField, "help");
      await userEvent.keyboard("{enter}");
      expect(screen.getByText("Available commands: whoami, projects, clear")).toBeInTheDocument();

      // Now clear
      await userEvent.type(inputField, "clear");
      await userEvent.keyboard("{enter}");
      
      // Initial lines might still be there if "clear" only clears command history
      // The current implementation of 'clear' sets lines to an empty array.
      expect(screen.queryByText("BillyMRX Terminal [Cyberpunk Edition]")).toBeNull();
      expect(screen.queryByText("Type `help` for a list of commands.")).toBeNull();
      expect(screen.queryByText("$ help")).toBeNull();
      expect(screen.queryByText("Available commands: whoami, projects, clear")).toBeNull();
      // Check that the input prompt is still there
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  // Test Suite for Closing
  describe("Closing", () => {
    test("calls onClose prop when close button is clicked", async () => {
      render(<Terminal visible={true} onClose={mockOnClose} />);
      const closeButton = screen.getByText("×");
      await userEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
