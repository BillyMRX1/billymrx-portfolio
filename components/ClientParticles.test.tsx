import { render, screen } from "@testing-library/react";
import ClientParticles from "./ClientParticles";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  })),
}));

// Mock react-tsparticles
jest.mock("react-tsparticles", () => ({
  Particles: jest.fn(() => <div data-testid="tsparticles-mock">Mocked tsParticles</div>),
}));
// Also mock the type for ParticlesProps if it's used, though not directly by ClientParticles
jest.mock("react-tsparticles", () => {
  const ActualParticles = jest.requireActual("react-tsparticles");
  return {
    ...ActualParticles,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Particles: jest.fn((_props) => <div data-testid="tsparticles-mock">Mocked tsParticles</div>),
  };
});


// Mock the ParticlesBG component, as ClientParticles directly renders it
jest.mock("./ParticlesBG", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function DummyParticlesBG(_props: unknown) {
    return <div data-testid="particles-bg-mock">ParticlesBG Mock</div>;
  };
});

describe("ClientParticles component", () => {
  test("renders ParticlesBG component", () => {
    render(<ClientParticles />);
    // Check if the mocked ParticlesBG component is rendered
    expect(screen.getByTestId("particles-bg-mock")).toBeInTheDocument();
    expect(screen.getByText("ParticlesBG Mock")).toBeInTheDocument();
  });

  test("ensures router and particles mocks are available", () => {
    // This test is mainly to confirm the mocks are set up if needed by underlying components
    // or for future expansion of ClientParticles.
    // For ClientParticles itself, it doesn't directly use these.
    const { useRouter } = require("next/router");
    const { Particles } = require("react-tsparticles");

    useRouter(); // Call it to make sure jest.fn() is in place
    expect(useRouter).toHaveBeenCalled();

    // Render something with Particles if it were used directly
    // For now, just check if the mock constructor is available
    expect(Particles).toBeDefined();
  });
});
