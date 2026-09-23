import { render, screen, fireEvent } from "@testing-library/react";
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
