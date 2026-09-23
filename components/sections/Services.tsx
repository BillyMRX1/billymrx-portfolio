"use client";

import { useEffect, useRef, useState } from "react";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { requestInquiry } from "@/lib/inquiryInterest";
import { scrollToSection } from "@/lib/scrollToSection";

// Timings for the FAQ accordion's Web Animations API driven open/close.
const OPEN_MS = 300;
const CLOSE_MS = 220;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // tailwind ease-apple
const CLOSE_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"; // tailwind glide
const FADE_MS = 150; // reduced-motion fallback

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

function FaqItem({ q, a }: { q: string; a: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  function setClosingState(value: boolean) {
    closingRef.current = value;
    setClosing(value);
  }

  function cancelAnimation() {
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }

  useEffect(() => {
    return () => {
      animationRef.current?.cancel();
    };
  }, []);

  function handleToggle() {
    const details = detailsRef.current;
    if (!details) return;

    if (!details.open) {
      // Covers closes from anywhere (click, script, find-in-page).
      cancelAnimation();
      setClosingState(false);
      return;
    }

    if (closingRef.current) {
      // Something external opened/kept it open while our close was running.
      cancelAnimation();
      setClosingState(false);
    }

    // Otherwise do nothing: must not cancel our own opening animation, whose
    // toggle event arrives after the animation has already started.
  }

  function handleSummaryClick(e: React.MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const panel = panelRef.current;
    if (!details || !panel) return;

    if (typeof panel.animate !== "function") return;

    if (prefersReducedMotion()) {
      if (!details.open) {
        // About to open: let the native default action run, just fade the answer in.
        panel.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: FADE_MS,
          fill: "none",
        });
      } else {
        // About to close: let native close happen instantly.
        cancelAnimation();
        setClosingState(false);
      }
      return;
    }

    // Capture the current rendered height before cancelling any running
    // animation, so a click mid-animation continues from where it visually is.
    // A closed panel can still report its last laid-out height, so start at 0.
    const startHeight = details.open ? panel.getBoundingClientRect().height : 0;
    const startOpacity = window.getComputedStyle(panel).opacity;
    cancelAnimation();

    if (!details.open) {
      e.preventDefault();
      details.open = true;
      const end = panel.scrollHeight;
      const anim = panel.animate(
        [
          { height: `${startHeight}px`, opacity: 0 },
          { height: `${end}px`, opacity: 1 },
        ],
        { duration: OPEN_MS, easing: EASE, fill: "none" },
      );
      animationRef.current = anim;
      const clear = () => {
        if (animationRef.current === anim) animationRef.current = null;
      };
      anim.finished.then(clear).catch(clear);
      return;
    }

    if (closingRef.current) {
      // Re-clicked during a close: reverse back to open.
      e.preventDefault();
      setClosingState(false);
      const end = panel.scrollHeight;
      const anim = panel.animate(
        [
          { height: `${startHeight}px`, opacity: startOpacity },
          { height: `${end}px`, opacity: 1 },
        ],
        { duration: OPEN_MS, easing: EASE, fill: "none" },
      );
      animationRef.current = anim;
      const clear = () => {
        if (animationRef.current === anim) animationRef.current = null;
      };
      anim.finished.then(clear).catch(clear);
      return;
    }

    // Start closing.
    e.preventDefault();
    setClosingState(true);
    const anim = panel.animate(
      [
        { height: `${startHeight}px`, opacity: 1 },
        { height: "0px", opacity: 0 },
      ],
      { duration: CLOSE_MS, easing: CLOSE_EASE, fill: "forwards" },
    );
    animationRef.current = anim;
    anim.finished
      .then(() => {
        if (animationRef.current === anim) {
          // Close first, then cancel, so there is no flash of full-height content.
          details.open = false;
          anim.cancel();
          animationRef.current = null;
          setClosingState(false);
        }
      })
      .catch(() => {
        // Cancelled (AbortError): a newer click already took over.
      });
  }

  return (
    <details
      ref={detailsRef}
      onToggle={handleToggle}
      data-closing={closing ? "" : undefined}
      className="group"
    >
      <summary
        onClick={handleSummaryClick}
        className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-medium text-[var(--text)] [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          data-faq-icon
          className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--separator)] text-[var(--text-secondary)] transition-colors duration-200 group-hover:border-[var(--text-tertiary)] group-hover:text-[var(--text)]"
        >
          <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
          <span className="absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-300 ease-apple group-open:rotate-90 group-open:scale-y-0 group-data-[closing]:rotate-0 group-data-[closing]:scale-y-100" />
        </span>
      </summary>
      <div ref={panelRef} data-faq-panel className="overflow-hidden">
        <p className="pb-4 text-[16px] leading-[1.5] text-[var(--text-secondary)]">{a}</p>
      </div>
    </details>
  );
}

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
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
