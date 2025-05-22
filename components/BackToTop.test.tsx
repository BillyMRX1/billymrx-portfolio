import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "./BackToTop";

describe("BackToTop component", () => {
  // Test for initial rendering (not visible)
  test("renders null when not visible", () => {
    render(<BackToTop />);
    expect(screen.queryByLabelText("Back to Top")).toBeNull();
  });

  // Test for visibility after scrolling
  test("becomes visible after scrolling down", () => {
    render(<BackToTop />);
    // Simulate scrolling down
    fireEvent.scroll(window, { target: { pageYOffset: 400 } });
    expect(screen.getByLabelText("Back to Top")).toBeVisible();
  });

  // Test for scrolling to top on click
  test("scrolls to top when clicked", () => {
    render(<BackToTop />);
    // Make the button visible
    fireEvent.scroll(window, { target: { pageYOffset: 400 } });
    const button = screen.getByLabelText("Back to Top");
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    // Click the button
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
