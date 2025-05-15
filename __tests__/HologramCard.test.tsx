import React from 'react';
import { render, screen } from "@testing-library/react";
import HologramCard from "@/components/HologramCard";

describe("HologramCard", () => {
  it("renders title and description", () => {
    render(<HologramCard title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders type badge if provided", () => {
    render(
      <HologramCard
        title="Project"
        description="With badge"
        type="personal"
      />
    );
    expect(screen.getByText("personal")).toBeInTheDocument();
  });

  it("renders link if provided", () => {
    render(
      <HologramCard
        title="Linked Project"
        description="Click me"
        link="https://example.com"
      />
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toHaveAttribute("href", "https://example.com");
  });
});
