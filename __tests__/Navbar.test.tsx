import { render, screen } from "@testing-library/react";
import React from "react";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders site logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Brilian.")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Navbar />);
    ["About", "Experience", "Projects", "Blog", "Contact"].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
