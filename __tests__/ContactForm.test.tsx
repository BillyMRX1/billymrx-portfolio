import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";
import { INQUIRY_INTEREST_EVENT } from "@/lib/inquiryInterest";

jest.mock("@emailjs/browser", () => ({
  __esModule: true,
  default: { send: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const emailjs = require("@emailjs/browser").default as { send: jest.Mock };

const ENV_KEYS = [
  "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
  "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
  "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
] as const;

function setValidEnv() {
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = "service_test";
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = "template_test";
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = "public_test";
}

function clearEnv() {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole("textbox", { name: /^name$/i }), "Jane Doe");
  await user.type(screen.getByRole("textbox", { name: /^email$/i }), "jane@example.com");
  await user.type(
    screen.getByLabelText(/what would you like to improve/i),
    "Help staff find answers in our internal policy documents."
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    emailjs.send.mockReset();
    emailjs.send.mockResolvedValue(undefined);
    clearEnv();
  });

  it("renders all fields with labels", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /^name$/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^email$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/company or website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what kind of project is this/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what would you like to improve/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what tools or documents are involved/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/budget range, if known/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/desired timeline/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send project inquiry/i })).toBeInTheDocument();
  });

  it("shows accessible errors on invalid submit and does not call send", async () => {
    setValidEnv();
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send project inquiry/i }));

    const nameInput = await screen.findByRole("textbox", { name: /^name$/i });
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("calls send once with a composed message on valid submit, then shows success (even with a double click)", async () => {
    setValidEnv();
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.selectOptions(
      screen.getByLabelText(/what kind of project is this/i),
      "document-assistant"
    );
    await user.type(
      screen.getByLabelText(/what tools or documents are involved/i),
      "Confluence and PDF manuals"
    );
    await user.type(screen.getByLabelText(/budget range, if known/i), "Not sure");
    await user.type(screen.getByLabelText(/desired timeline/i), "Q4");

    const submit = screen.getByRole("button", { name: /send project inquiry/i });
    await user.dblClick(submit);

    await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));

    const [, , params] = emailjs.send.mock.calls[0];
    expect(params.name).toBe("Jane Doe");
    expect(params.email).toBe("jane@example.com");
    expect(params.message).toContain("Project type: Document assistant pilot");
    expect(params.message).toContain(
      "Help staff find answers in our internal policy documents."
    );
    expect(params.message).toContain("Tools or documents: Confluence and PDF manuals");
    expect(params.message).toContain("Budget: Not sure");
    expect(params.message).toContain("Timeline: Q4");

    expect(await screen.findByRole("status")).toHaveTextContent(/thanks, your inquiry was sent/i);
  });

  it("shows the alert and keeps typed values when send rejects", async () => {
    setValidEnv();
    emailjs.send.mockRejectedValue(new Error("network error"));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send project inquiry/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/your inquiry could not be sent/i);
    expect(within(alert).getByRole("link", { name: /email billy/i })).toHaveAttribute(
      "href",
      "mailto:brilianadeputra@gmail.com"
    );
    expect(screen.getByRole("textbox", { name: /^name$/i })).toHaveValue("Jane Doe");
    expect(screen.getByRole("textbox", { name: /^email$/i })).toHaveValue("jane@example.com");
  });

  it("does not call send and shows an error when env vars are missing", async () => {
    clearEnv();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /send project inquiry/i }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining("NEXT_PUBLIC_EMAILJS"));
    consoleErrorSpy.mockRestore();
  });

  it("does not call send and never shows success when the honeypot is filled", async () => {
    setValidEnv();
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValidForm(user);
    await user.type(screen.getByLabelText(/leave this field empty/i), "http://spam.example");
    await user.click(screen.getByRole("button", { name: /send project inquiry/i }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("preselects document-assistant when the interest event is dispatched", async () => {
    render(<ContactForm />);

    window.dispatchEvent(
      new CustomEvent(INQUIRY_INTEREST_EVENT, { detail: "document-assistant" })
    );

    await waitFor(() =>
      expect(screen.getByLabelText(/what kind of project is this/i)).toHaveValue(
        "document-assistant"
      )
    );
  });
});

describe("required field indicators", () => {
  const REQUIRED_IDS = ["name", "email", "goal"] as const;
  const OPTIONAL_IDS = ["company", "projectType", "tools", "budget", "timeline"] as const;

  beforeEach(() => {
    emailjs.send.mockReset();
    emailjs.send.mockResolvedValue(undefined);
    clearEnv();
  });

  it("marks required fields with `required` and a visible asterisk in the label", () => {
    const { container } = render(<ContactForm />);

    for (const id of REQUIRED_IDS) {
      const control = container.querySelector(`#${id}`);
      expect(control).toBeRequired();

      const label = container.querySelector(`label[for="${id}"]`);
      const asterisks = label?.querySelectorAll('span[aria-hidden="true"]');
      expect(asterisks).toHaveLength(1);
      expect(asterisks?.[0]).toHaveTextContent("*");
    }
  });

  it("leaves optional fields without `required` or an asterisk", () => {
    const { container } = render(<ContactForm />);

    for (const id of OPTIONAL_IDS) {
      const control = container.querySelector(`#${id}`);
      expect(control).not.toBeRequired();

      const label = container.querySelector(`label[for="${id}"]`);
      expect(label?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
      expect(label?.textContent).not.toContain("*");
    }
  });

  it("excludes the asterisk from the accessible name of required controls", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: /^name$/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^email$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /^what would you like to improve\?$/i })
    ).toBeInTheDocument();
  });

  it("flags exactly the required fields as invalid on empty submit, matching the asterisk list", async () => {
    setValidEnv();
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send project inquiry/i }));

    await waitFor(() => {
      const invalidIds = [...REQUIRED_IDS, ...OPTIONAL_IDS].filter((id) => {
        const control = container.querySelector(`#${id}`);
        return control?.getAttribute("aria-invalid") === "true";
      });
      expect(new Set(invalidIds)).toEqual(new Set(REQUIRED_IDS));
    });
  });
});
