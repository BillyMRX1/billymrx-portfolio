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
    ["Services", "Work", "About", "Blog"].forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders the CTA link pointing to #contact", () => {
    render(<Navbar />);
    const ctas = screen.getAllByText("Discuss a project");
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => {
      expect(cta.closest("a")).toHaveAttribute("href", "#contact");
    });
  });

  it("links point at the expected section anchors", () => {
    render(<Navbar />);
    expect(screen.getByText("Services").closest("a")).toHaveAttribute("href", "#services");
    expect(screen.getByText("Work").closest("a")).toHaveAttribute("href", "#projects");
    expect(screen.getByText("About").closest("a")).toHaveAttribute("href", "#about");
    expect(screen.getByText("Blog").closest("a")).toHaveAttribute("href", "#blog");
  });

  it("hamburger button has aria-expanded and aria-controls", () => {
    render(<Navbar />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls");
  });
});
