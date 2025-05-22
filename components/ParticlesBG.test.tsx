import { render, screen } from "@testing-library/react";
import ParticlesBG from "./ParticlesBG";
import Particles from "react-tsparticles"; // To mock its type if needed, actual mock below
import { loadFull } from "tsparticles"; // To mock its type if needed, actual mock below

// Mock react-tsparticles
jest.mock("react-tsparticles", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ActualParticles = jest.requireActual("react-tsparticles");
  // Mock the Particles component
  // It needs to accept init and options props
  return {
    // We can't use ActualParticles.Particles directly as we are mocking it.
    // We need a new function component for the mock.
    __esModule: true, // This is important for modules with default exports
    default: jest.fn(({ init, options }) => (
      <div data-testid="mocked-particles">
        <button onClick={() => init && init("mockEngine")}>Call Init</button>
        <pre>{JSON.stringify(options)}</pre>
      </div>
    )),
  };
});

// Mock tsparticles
jest.mock("tsparticles", () => ({
  loadFull: jest.fn(),
}));

describe("ParticlesBG component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    (Particles as unknown as jest.Mock).mockClear();
    (loadFull as jest.Mock).mockClear();
  });

  test("renders the Particles component", () => {
    render(<ParticlesBG />);
    expect(screen.getByTestId("mocked-particles")).toBeInTheDocument();
  });

  test("Particles component receives correct options prop", () => {
    render(<ParticlesBG />);
    const expectedOptions = {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: "#0a0a0a" } },
      particles: {
        color: { value: "#00ffff" },
        links: { enable: false },
        move: { enable: true, speed: 0.5 },
        number: { value: 60 },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
    };
    // The options are stringified in the mock component
    expect(screen.getByText(JSON.stringify(expectedOptions))).toBeInTheDocument();
  });

  test("init function calls loadFull when invoked", async () => {
    render(<ParticlesBG />);
    // The mock Particles component has a button to call the init function
    const initButton = screen.getByRole("button", { name: "Call Init" });
    
    // loadFull should not have been called yet
    expect(loadFull).not.toHaveBeenCalled();

    // Click the button to trigger the init function
    initButton.click();

    // Now loadFull should have been called
    // It's an async function, so we might need to wait if there were real async operations
    // but since loadFull is mocked and ParticlesBG's init is async, let's await it.
    await Promise.resolve(); // Ensure any promises within init resolve

    expect(loadFull).toHaveBeenCalledTimes(1);
    expect(loadFull).toHaveBeenCalledWith("mockEngine"); // The mock engine passed by the button
  });

   test("Particles component is called with an init prop", () => {
    render(<ParticlesBG />);
    // The default export of react-tsparticles is the Particles component
    const MockedParticlesComponent = require("react-tsparticles").default;
    expect(MockedParticlesComponent).toHaveBeenCalled();
    expect(MockedParticlesComponent.mock.calls[0][0].init).toBeInstanceOf(Function);
  });
});
