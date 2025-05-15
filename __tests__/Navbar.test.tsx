import { render, screen } from "@testing-library/react";
import React from 'react';
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders site title", () => {
    render(<Navbar />);
    expect(screen.getByText("BillyMRX")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Navbar />);
    ["About", "Projects", "Experience", "Resume", "Contact", "Blog"].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
