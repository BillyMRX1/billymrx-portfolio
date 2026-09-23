import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";

// jsdom has no IntersectionObserver; FadeInWhenVisible (framer-motion's
// useInView) needs one to mount without throwing. Minimal local stub.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
beforeAll(() => {
  // @ts-expect-error jsdom test environment stub, not a spec-complete IntersectionObserver
  global.IntersectionObserver = IntersectionObserverStub;
});

jest.mock("@/lib/inquiryInterest", () => ({
  requestInquiry: jest.fn(),
}));

import Services from "@/components/sections/Services";
import { requestInquiry } from "@/lib/inquiryInterest";

const mockedRequestInquiry = requestInquiry as jest.Mock;

describe("Services", () => {
  beforeEach(() => {
    mockedRequestInquiry.mockClear();
  });

  it("calls requestInquiry with 'document-assistant' when the primary CTA is clicked", () => {
    render(<Services />);
    fireEvent.click(screen.getByText("Discuss your document assistant"));
    expect(mockedRequestInquiry).toHaveBeenCalledTimes(1);
    expect(mockedRequestInquiry).toHaveBeenCalledWith("document-assistant");
  });

  it("contains no price, currency, or duration claims", () => {
    render(<Services />);
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/\$/);
    expect(text).not.toMatch(/¥/);
    expect(text).not.toMatch(/\bUSD\b/);
    expect(text).not.toMatch(/\bJPY\b/);
    expect(text).not.toMatch(/\bweeks?\b/i);
  });

  it("has no Honda mentions", () => {
    render(<Services />);
    expect(document.body.textContent || "").not.toMatch(/Honda/i);
  });
});

// jsdom (used by this project) has no Element.prototype.animate and no
// window.matchMedia. Both are faked here so the Web Animations API driven
// FAQ accordion in Services.tsx can be exercised and controlled from tests.
class FakeAnimation {
  cancelled = false;
  onfinish: (() => void) | null = null;
  finished: Promise<void>;
  private resolveFinished!: () => void;
  private rejectFinished!: (reason: unknown) => void;

  constructor() {
    this.finished = new Promise<void>((resolve, reject) => {
      this.resolveFinished = resolve;
      this.rejectFinished = reject;
    });
    // Nothing rejects this synchronously in normal flows; avoid noisy
    // "unhandled rejection" output for animations that are cancelled without
    // a caller ever attaching a rejection handler in a given test.
    this.finished.catch(() => {});
  }

  finish() {
    this.resolveFinished();
    this.onfinish?.();
  }

  cancel() {
    if (this.cancelled) return;
    this.cancelled = true;
    this.rejectFinished(new DOMException("The animation was cancelled", "AbortError"));
  }
}

function getFaqItem(question: string) {
  const summary = screen.getByText(question).closest("summary");
  if (!summary) throw new Error(`No summary found for question: ${question}`);
  const details = summary.closest("details");
  if (!details) throw new Error(`No details found for question: ${question}`);
  const panel = details.querySelector("[data-faq-panel]");
  if (!panel) throw new Error(`No answer panel found for question: ${question}`);
  return { summary: summary as HTMLElement, details: details as HTMLDetailsElement, panel: panel as HTMLElement };
}

// Flush the microtask queue (Promise.then/.catch chains) inside act() so
// resulting setState calls are applied and the DOM is up to date.
async function flush() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("FAQ accordion", () => {
  let reduced = false;
  let animateMock: jest.Mock;
  let createdAnimations: FakeAnimation[];
  let originalMatchMedia: typeof window.matchMedia | undefined;
  let originalAnimate: typeof Element.prototype.animate | undefined;

  beforeEach(() => {
    reduced = false;
    createdAnimations = [];
    originalMatchMedia = window.matchMedia;
    originalAnimate = Element.prototype.animate;

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: reduced,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })) as unknown as typeof window.matchMedia;

    animateMock = jest.fn(() => {
      const anim = new FakeAnimation();
      createdAnimations.push(anim);
      return anim;
    });
    Element.prototype.animate = animateMock;
  });

  afterEach(() => {
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      // @ts-expect-error restore to the pre-test (undefined in jsdom) state
      delete window.matchMedia;
    }
    if (originalAnimate) {
      Element.prototype.animate = originalAnimate;
    } else {
      // @ts-expect-error restore to the pre-test (undefined in jsdom) state
      delete Element.prototype.animate;
    }
  });

  it("renders four accordion items with unchanged question text, an aria-hidden icon, and answers present in the DOM", () => {
    render(<Services />);
    const detailsElements = Array.from(document.querySelectorAll("details"));
    expect(detailsElements).toHaveLength(4);

    const questions = [
      "Can this work with private documents?",
      "Can you add it to an existing product?",
      "What if the answer is missing?",
      "Is ongoing support included?",
    ];
    const answers = [
      "We agree on access, hosting, and data handling before using private documents.",
      "Integration can be scoped after reviewing your product and requirements.",
      "The assistant is designed to flag missing information and point the user to a human contact.",
      "Support scope and ongoing costs are agreed separately.",
    ];

    detailsElements.forEach((details, i) => {
      const summary = details.querySelector("summary");
      expect(summary).not.toBeNull();
      expect(summary?.textContent).toContain(questions[i]);
      expect(summary?.querySelector('[aria-hidden="true"]')).not.toBeNull();
      expect(screen.getByText(answers[i])).toBeInTheDocument();
    });
  });

  it("opens on click and animates height and opacity", () => {
    render(<Services />);
    const { summary, details } = getFaqItem("Can this work with private documents?");

    fireEvent.click(summary);

    expect(details.open).toBe(true);
    expect(animateMock).toHaveBeenCalledTimes(1);
    const [keyframes, options] = animateMock.mock.calls[0];
    expect(keyframes[0]).toMatchObject({ opacity: 0 });
    expect(keyframes[1]).toMatchObject({ opacity: 1 });
    expect(keyframes[0]).toHaveProperty("height");
    expect(keyframes[1]).toHaveProperty("height");
    expect(options).toMatchObject({ duration: 300 });
  });

  it("opens from zero height even when the closed panel reports a stale layout height", () => {
    render(<Services />);
    const { summary, panel } = getFaqItem("Can this work with private documents?");
    jest.spyOn(panel, "getBoundingClientRect").mockReturnValue({ height: 40 } as DOMRect);

    fireEvent.click(summary);

    const [keyframes] = animateMock.mock.calls[0];
    expect(keyframes[0]).toMatchObject({ height: "0px", opacity: 0 });
  });

  it("starts closing on click, stays open with data-closing until the animation finishes, then closes", async () => {
    render(<Services />);
    const { summary, details } = getFaqItem("Can this work with private documents?");

    fireEvent.click(summary); // open
    expect(details.open).toBe(true);
    await flush();

    fireEvent.click(summary); // start closing
    expect(details.open).toBe(true);
    expect(details.hasAttribute("data-closing")).toBe(true);

    const closeAnim = createdAnimations[1];
    expect(closeAnim.cancelled).toBe(false);

    await act(async () => {
      closeAnim.finish();
    });
    await flush();

    expect(details.open).toBe(false);
    expect(details.hasAttribute("data-closing")).toBe(false);
    expect(closeAnim.cancelled).toBe(true);
  });

  it("handles rapid re-toggling: clicking to reopen before the close animation finishes", async () => {
    render(<Services />);
    const { summary, details } = getFaqItem("Can this work with private documents?");

    fireEvent.click(summary); // open
    await flush();
    expect(details.open).toBe(true);

    fireEvent.click(summary); // start closing
    expect(details.hasAttribute("data-closing")).toBe(true);
    const closeAnim = createdAnimations[1];

    fireEvent.click(summary); // reopen before close finishes
    expect(details.open).toBe(true);
    expect(details.hasAttribute("data-closing")).toBe(false);
    expect(closeAnim.cancelled).toBe(true);

    // Resolving the stale (already-cancelled) close animation afterwards
    // must not close the item.
    await act(async () => {
      closeAnim.finish();
    });
    await flush();

    expect(details.open).toBe(true);
    expect(details.hasAttribute("data-closing")).toBe(false);
  });

  it("regression: cancels an in-progress close and clears data-closing when kept open externally (find-in-page style)", async () => {
    render(<Services />);
    const { summary, details, panel } = getFaqItem("Can this work with private documents?");

    fireEvent.click(summary); // open
    await flush();

    fireEvent.click(summary); // start closing
    expect(details.hasAttribute("data-closing")).toBe(true);
    const closeAnim = createdAnimations[1];

    // Simulate an external actor (e.g. browser find-in-page) keeping the
    // details open and firing the native toggle event without going
    // through our click handler.
    await act(async () => {
      details.dispatchEvent(new Event("toggle"));
    });

    expect(closeAnim.cancelled).toBe(true);
    expect(details.hasAttribute("data-closing")).toBe(false);
    expect(details.open).toBe(true);
    expect(panel.style.opacity).toBe("");
  });

  it("regression: no leftover data-closing or inline opacity when opened externally via the open property", async () => {
    render(<Services />);
    const { summary, details, panel } = getFaqItem("Can this work with private documents?");

    // Fully open then close through our own flow.
    fireEvent.click(summary);
    await flush();
    fireEvent.click(summary);
    await act(async () => {
      createdAnimations[1].finish();
    });
    await flush();
    expect(details.open).toBe(false);

    // Open externally without a click: just the open property plus the
    // native toggle event that setting it dispatches.
    await act(async () => {
      details.open = true;
      details.dispatchEvent(new Event("toggle"));
    });

    expect(details.hasAttribute("data-closing")).toBe(false);
    expect(panel.style.opacity).toBe("");
  });

  it("reduced motion: closing an open item happens immediately, with no height keyframes", async () => {
    render(<Services />);
    const { summary, details } = getFaqItem("Can this work with private documents?");

    fireEvent.click(summary); // open (motion still enabled at this point)
    await flush();
    expect(details.open).toBe(true);
    animateMock.mockClear();

    reduced = true;
    fireEvent.click(summary); // close, reduced motion

    expect(details.open).toBe(false);
    expect(details.hasAttribute("data-closing")).toBe(false);
    for (const call of animateMock.mock.calls) {
      const [keyframes] = call;
      expect(keyframes[0]).not.toHaveProperty("height");
      expect(keyframes[1]).not.toHaveProperty("height");
    }
  });

  it("summary elements are keyboard focusable", () => {
    render(<Services />);
    const detailsElements = Array.from(document.querySelectorAll("details"));
    detailsElements.forEach((details) => {
      const summary = details.querySelector("summary");
      expect(summary?.tabIndex).toBe(0);
    });
  });
});
