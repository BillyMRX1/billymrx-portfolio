import { render, screen } from "@testing-library/react";
import GlitchText from "./GlitchText";
import { useGlitch } from "react-powerglitch";

// Mock react-powerglitch
jest.mock("react-powerglitch", () => ({
  useGlitch: jest.fn(),
}));

describe("GlitchText component", () => {
  const mockRef = { current: null }; // Simple ref mock

  beforeEach(() => {
    // Reset mocks and provide a default implementation for useGlitch for each test
    (useGlitch as jest.Mock).mockClear();
    (useGlitch as jest.Mock).mockReturnValue({ ref: mockRef });
  });

  test("renders the provided text content correctly", () => {
    const testText = "Hello, Glitch!";
    render(<GlitchText>{testText}</GlitchText>);

    // Check if the text is rendered
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test("renders a span element", () => {
    const testText = "Span Test";
    render(<GlitchText>{testText}</GlitchText>);
    const spanElement = screen.getByText(testText);
    expect(spanElement.tagName).toBe("SPAN");
  });

  test("calls useGlitch hook with correct parameters", () => {
    const testText = "Hook Test";
    render(<GlitchText>{testText}</GlitchText>);

    expect(useGlitch).toHaveBeenCalledTimes(1);
    expect(useGlitch).toHaveBeenCalledWith({
      playMode: "always",
      timing: { duration: 1500, iterations: Infinity },
      glitchTimeSpan: {
        start: 0.1,
        end: 0.3,
      },
      shake: { velocity: 15, amplitudeX: 0.4, amplitudeY: 0.2 },
      slice: { count: 4, velocity: 10 },
    });
  });

  test("applies the ref from useGlitch to the span element", () => {
    const testText = "Ref Test";
    // Create a specific ref for this test to check if it's assigned
    const specificMockRef = jest.fn();
     (useGlitch as jest.Mock).mockReturnValue({ ref: specificMockRef });

    render(<GlitchText>{testText}</GlitchText>);
    
    // Check if the ref function was called, implying it was assigned to the element
    // Note: Testing actual ref assignment to a DOM element in JSDOM can be tricky.
    // react-testing-library focuses on user-observable behavior.
    // Here, we check if the ref provided by the hook is used.
    // The span element itself will be available, and we've mocked useGlitch to provide the ref.
    // A more direct test would be to check if specificMockRef.current is the span,
    // but this requires the mock ref to actually capture the element.
    // For now, confirming the hook provides a ref and it's used is a good start.
    // If the ref from useGlitch is passed to the span's ref attribute, 
    // the mock function (specificMockRef) should be called by React with the element.
    expect(specificMockRef).toHaveBeenCalled();
  });

  test("applies correct classNames to the span element", () => {
    const testText = "ClassName Test";
    render(<GlitchText>{testText}</GlitchText>);
    const spanElement = screen.getByText(testText);
    expect(spanElement).toHaveClass("text-neon text-5xl font-bold");
  });
});
