"use client";

import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { requestInquiry } from "@/lib/inquiryInterest";
import { scrollToSection } from "@/lib/scrollToSection";

const DESIGNED_TO_DO = [
  "Find relevant information without searching through multiple documents.",
  "Show the sources behind each answer so people can check them.",
  "Flag questions that need a person to follow up.",
];

const PILOT_SCOPE = [
  "One agreed document collection, with format and size limits defined before work begins.",
  "One web interface.",
  "Answers with references to supporting documents.",
  "Handling for unanswered or ambiguous questions.",
  "Evaluation against an agreed question set.",
  "Setup and handover notes.",
];

const FAQ = [
  {
    q: "Can this work with private documents?",
    a: "We agree on access, hosting, and data handling before using private documents.",
  },
  {
    q: "Can you add it to an existing product?",
    a: "Integration can be scoped after reviewing your product and requirements.",
  },
  {
    q: "What if the answer is missing?",
    a: "The assistant is designed to flag missing information and point the user to a human contact.",
  },
  {
    q: "Is ongoing support included?",
    a: "Support scope and ongoing costs are agreed separately.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[var(--bg)] py-20 md:py-section-y lg:py-section-y-lg px-gutter">
      <div className="mx-auto max-w-apple">
        <FadeInWhenVisible>
          <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            Featured service
          </span>
          <h2 className="mt-4 text-balance text-[clamp(32px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            Find answers in your company documents.
          </h2>
          <p className="mt-6 max-w-prose text-[19px] leading-[1.5] text-[var(--text-secondary)]">
            Give staff or customers a simpler way to find information in
            manuals, policies, and product documentation. I build a focused
            assistant that answers from an agreed document collection and
            links back to its sources.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--separator)] bg-[var(--surface-elevated)] p-6 md:p-8">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                What it is designed to do
              </h3>
              <ul className="mt-4 space-y-3">
                {DESIGNED_TO_DO.map((item) => (
                  <li
                    key={item}
                    className="text-[17px] leading-[1.5] text-[var(--text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--separator)] bg-[var(--surface-elevated)] p-6 md:p-8">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                Pilot scope
              </h3>
              <ul className="mt-4 space-y-3">
                {PILOT_SCOPE.map((item) => (
                  <li
                    key={item}
                    className="text-[17px] leading-[1.5] text-[var(--text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mt-12 space-y-4 border-t border-[var(--separator)] pt-12">
            <p className="text-[17px] leading-[1.5] text-[var(--text)]">
              <span className="font-medium">What I need from you: </span>
              An approved sample of your documents, representative questions,
              and someone who can review the answers.
            </p>
            <p className="text-[17px] leading-[1.5] text-[var(--text-secondary)]">
              Fixed-price pilot after a short scoping conversation. Delivery
              timing, document limits, and any ongoing software costs are
              agreed before work starts.
            </p>
            <p className="text-[17px] leading-[1.5] text-[var(--text-secondary)]">
              Building this for a client? I can work with your team on a
              clearly scoped implementation.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                requestInquiry("document-assistant");
              }}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-[400ms] ease-apple hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Discuss your document assistant
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="text-[15px] font-medium text-[var(--accent)] no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              See the PDF RAG project behind this approach
            </a>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="mt-16 border-t border-[var(--separator)] pt-12">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
              Frequently asked
            </h3>
            <div className="mt-4 divide-y divide-[var(--separator)]">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-[var(--text)] [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-[var(--text-tertiary)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-[1.5] text-[var(--text-secondary)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
