import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import emailjs from "@emailjs/browser";

// Mock emailjs
jest.mock("@emailjs/browser", () => ({
  send: jest.fn(),
}));

// Mock window.alert
global.alert = jest.fn();

describe("ContactForm component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Set up mock environment variables
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "test_service_id";
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "test_template_id";
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "test_public_key";
  });

  test("renders all form fields and the submit button", () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  test("does not call emailjs.send if fields are empty and form is submitted", async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button", { name: /Send/i });

    await userEvent.click(submitButton);

    expect(emailjs.send).not.toHaveBeenCalled();
    // react-hook-form will prevent submission, so no success/error message from our component logic yet
    expect(screen.queryByText("Message sent successfully!")).toBeNull();
    expect(global.alert).not.toHaveBeenCalled();
  });

  test("calls emailjs.send with correct data and shows success message on successful submission", async () => {
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200, text: "OK" });
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const messageInput = screen.getByPlaceholderText("Your Message");
    const submitButton = screen.getByRole("button", { name: /Send/i });

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(messageInput, "This is a test message.");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        "test_service_id",
        "test_template_id",
        {
          name: "Test User",
          email: "test@example.com",
          message: "This is a test message.",
        },
        "test_public_key"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Message sent successfully!")).toBeInTheDocument();
    });

    // Check if form is reset
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });

  test("shows alert on failed submission", async () => {
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error("Failed to send"));
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("Your Email");
    const messageInput = screen.getByPlaceholderText("Your Message");
    const submitButton = screen.getByRole("button", { name: /Send/i });

    await userEvent.type(nameInput, "Test User");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(messageInput, "This is a test message.");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Failed to send message. Please try again.");
    });
    expect(screen.queryByText("Message sent successfully!")).toBeNull();
  });
});
