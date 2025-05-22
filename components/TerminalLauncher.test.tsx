import { render, screen, fireEvent } from "@testing-library/react";
// userEvent is not strictly needed for global keydown events, fireEvent is sufficient.
import TerminalLauncher from "./TerminalLauncher";
import Terminal from "@/components/Terminal"; // Actual path for mocking

// Mock the Terminal component
jest.mock("@/components/Terminal", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return jest.fn(({ visible, onClose }) => {
    // Store the onClose prop if we need to call it
    (Terminal as any).mockedOnClose = onClose; 
    return visible ? <div data-testid="mock-terminal">Terminal Visible</div> : null;
  });
});


describe("TerminalLauncher component", () => {
  let mockTerminalComponent: jest.Mock;

  beforeEach(() => {
    // Clear mock calls and reset any stored state
    mockTerminalComponent = Terminal as jest.Mock;
    mockTerminalComponent.mockClear();
    if ((Terminal as any).mockedOnClose) {
      delete (Terminal as any).mockedOnClose;
    }
  });

  test("renders correctly and Terminal is initially not visible", () => {
    render(<TerminalLauncher />);
    // Check if Terminal mock was called
    expect(mockTerminalComponent).toHaveBeenCalledTimes(1);
    // Check if Terminal was rendered with visible: false
    expect(mockTerminalComponent.mock.calls[0][0].visible).toBe(false);
    expect(screen.queryByTestId("mock-terminal")).toBeNull();
  });

  test("toggles Terminal visibility on Ctrl + ` keydown event", () => {
    render(<TerminalLauncher />);
    
    // Terminal should be initially invisible
    expect(mockTerminalComponent.mock.calls[0][0].visible).toBe(false);
    expect(screen.queryByTestId("mock-terminal")).toBeNull();

    // Simulate Ctrl + ` keydown
    fireEvent.keyDown(window, { key: "`", ctrlKey: true });
    
    // Terminal should now be visible
    // The component re-renders, so Terminal mock is called again.
    // The last call to the mock should have visible: true
    expect(mockTerminalComponent.mock.calls[mockTerminalComponent.mock.calls.length - 1][0].visible).toBe(true);
    expect(screen.getByTestId("mock-terminal")).toBeInTheDocument();
    expect(screen.getByText("Terminal Visible")).toBeInTheDocument();

    // Simulate Ctrl + ` keydown again
    fireEvent.keyDown(window, { key: "`", ctrlKey: true });

    // Terminal should be hidden again
    expect(mockTerminalComponent.mock.calls[mockTerminalComponent.mock.calls.length - 1][0].visible).toBe(false);
    expect(screen.queryByTestId("mock-terminal")).toBeNull();
  });

  test("Terminal becomes hidden when its onClose prop is called", () => {
    render(<TerminalLauncher />);

    // 1. Make the terminal visible via keyboard shortcut
    fireEvent.keyDown(window, { key: "`", ctrlKey: true });
    expect(mockTerminalComponent.mock.calls[mockTerminalComponent.mock.calls.length - 1][0].visible).toBe(true);
    expect(screen.getByTestId("mock-terminal")).toBeInTheDocument();

    // 2. Get the onClose function passed to the mock and call it
    const passedProps = mockTerminalComponent.mock.calls[mockTerminalComponent.mock.calls.length - 1][0];
    expect(passedProps.onClose).toBeInstanceOf(Function);
    
    // Simulate Terminal calling its onClose
    passedProps.onClose();

    // 3. Terminal should now be hidden
    // The component re-renders, Terminal mock is called again with new props
    expect(mockTerminalComponent.mock.calls[mockTerminalComponent.mock.calls.length - 1][0].visible).toBe(false);
    expect(screen.queryByTestId("mock-terminal")).toBeNull();
  });
  
  test("removes keydown event listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<TerminalLauncher />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    // Check if the same handler function was removed (important for correctness)
    expect(removeEventListenerSpy.mock.calls[0][1]).toBe(addEventListenerSpy.mock.calls[0][1]);


    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
