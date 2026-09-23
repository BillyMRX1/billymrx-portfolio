import { fireEvent, render, screen } from "@testing-library/react";
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

  it("renders a desktop Resume link to the PDF that opens in a new tab", () => {
    render(<Navbar />);
    const resumeLinks = screen.getAllByRole("link", { name: /resume/i });
    const desktopResume = resumeLinks.find((link) => link.getAttribute("href") === "/resume.pdf");
    expect(desktopResume).toBeDefined();
    expect(desktopResume).toHaveAttribute("target", "_blank");
    expect(desktopResume).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders a mobile Resume link after opening the hamburger menu", () => {
    render(<Navbar />);
    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);

    const resumeLinks = screen.getAllByRole("link", { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(2);
    resumeLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/resume.pdf");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });
  });

  it("still points the Discuss a project CTA at #contact", () => {
    render(<Navbar />);
    const ctas = screen.getAllByText("Discuss a project");
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((cta) => {
      expect(cta.closest("a")).toHaveAttribute("href", "#contact");
    });
  });

  it("closes the mobile menu when the Resume link is clicked", () => {
    render(<Navbar />);
    const button = screen.getByLabelText("Toggle menu");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    const resumeLinks = screen.getAllByRole("link", { name: /resume/i });
    const mobileResume = resumeLinks[resumeLinks.length - 1];
    fireEvent.click(mobileResume);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
