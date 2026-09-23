import { scrollToSection } from "@/lib/scrollToSection";

export type InquiryInterest = "document-assistant" | "other-ai" | "not-sure";

export const INQUIRY_INTEREST_EVENT = "inquiry:interest";

/**
 * Announces which service the visitor is interested in and scrolls them to
 * the contact section. ContactForm listens for INQUIRY_INTEREST_EVENT and
 * preselects the matching "project type" field.
 */
export function requestInquiry(interest: InquiryInterest): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<InquiryInterest>(INQUIRY_INTEREST_EVENT, { detail: interest })
  );
  scrollToSection("contact");
}
