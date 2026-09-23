"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  INQUIRY_INTEREST_EVENT,
  type InquiryInterest,
} from "@/lib/inquiryInterest";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  company: z
    .string()
    .trim()
    .max(200, "Company or website must be 200 characters or fewer."),
  projectType: z.enum(["", "document-assistant", "other-ai", "not-sure"]),
  goal: z
    .string()
    .trim()
    .min(10, "Please describe what you'd like to improve (at least 10 characters).")
    .max(3000, "Please keep this under 3000 characters."),
  tools: z.string().trim().max(1500, "Please keep this under 1500 characters."),
  budget: z.string().trim().max(100, "Budget must be 100 characters or fewer."),
  timeline: z.string().trim().max(100, "Timeline must be 100 characters or fewer."),
  // Honeypot: real visitors never see or fill this field.
  website_url: z.string(),
});

type FormData = z.infer<typeof contactSchema>;

type EmailJSClient = (typeof import("@emailjs/browser"))["default"];
let emailClientPromise: Promise<EmailJSClient> | null = null;

const loadEmailClient = () => {
  if (!emailClientPromise) {
    emailClientPromise = import("@emailjs/browser").then((module) => module.default);
  }
  return emailClientPromise;
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "document-assistant": "Document assistant pilot",
  "other-ai": "Another AI feature or integration",
  "not-sure": "Not sure yet",
};

function labelForProjectType(value: string): string {
  return PROJECT_TYPE_LABELS[value] ?? "Not provided";
}

function orNotProvided(value: string): string {
  return value.trim().length > 0 ? value.trim() : "Not provided";
}

function composeMessage(data: FormData): string {
  return [
    `Project type: ${labelForProjectType(data.projectType)}`,
    `Company or website: ${orNotProvided(data.company)}`,
    "",
    "What would you like to improve?",
    data.goal,
    "",
    `Tools or documents: ${orNotProvided(data.tools)}`,
    `Budget: ${orNotProvided(data.budget)}`,
    `Timeline: ${orNotProvided(data.timeline)}`,
  ].join("\n");
}

const inputClass =
  "w-full px-4 py-3 border border-[var(--border)] rounded-lg font-[inherit] text-[0.9rem] bg-[var(--input-bg)] text-[var(--text)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-light)]";

const labelClass = "block text-[0.8rem] font-medium mb-[0.4rem] text-[var(--text)]";

const errorClass = "text-[#ef4444] text-[0.8rem] mt-[0.3rem]";

const requiredMark = (
  <span aria-hidden="true" className="ml-0.5 text-[#ef4444]">
    *
  </span>
);

const defaultValues: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  goal: "",
  tools: "",
  budget: "",
  timeline: "",
  website_url: "",
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    function handleInterestEvent(event: Event) {
      const custom = event as CustomEvent<InquiryInterest>;
      setValue("projectType", custom.detail, { shouldValidate: false });

      if (!getValues("name")) {
        const nameInput = document.getElementById("name") as HTMLInputElement | null;
        nameInput?.focus({ preventScroll: true });
      }
    }

    window.addEventListener(INQUIRY_INTEREST_EVENT, handleInterestEvent);
    return () => window.removeEventListener(INQUIRY_INTEREST_EVENT, handleInterestEvent);
  }, [setValue, getValues]);

  const onSubmit = async (data: FormData) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setStatus("loading");

    try {
      // Honeypot: real visitors never fill this in. If it's populated, treat
      // the submission as spam without contacting EmailJS or the user.
      if (data.website_url) {
        setStatus("error");
        return;
      }

      const envVars: Array<[string, string | undefined]> = [
        ["NEXT_PUBLIC_EMAILJS_SERVICE_ID", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID],
        ["NEXT_PUBLIC_EMAILJS_TEMPLATE_ID", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID],
        ["NEXT_PUBLIC_EMAILJS_PUBLIC_KEY", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY],
      ];
      const missingVars = envVars.filter(([, value]) => !value).map(([name]) => name);
      if (missingVars.length > 0) {
        console.error(
          `ContactForm: missing EmailJS environment variable(s): ${missingVars.join(", ")}`
        );
        setStatus("error");
        return;
      }

      const emailjs = await loadEmailClient();
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          message: composeMessage(data),
          company: orNotProvided(data.company),
          project_type: labelForProjectType(data.projectType),
          goal: data.goal,
          tools: orNotProvided(data.tools),
          budget: orNotProvided(data.budget),
          timeline: orNotProvided(data.timeline),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>
          Name{requiredMark}
        </label>
        <input
          id="name"
          {...register("name")}
          placeholder="Your name"
          required
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        {errors.name ? (
          <p id="name-error" className={errorClass}>
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email{requiredMark}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          required
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        {errors.email ? (
          <p id="email-error" className={errorClass}>
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company or website
        </label>
        <input
          id="company"
          {...register("company")}
          placeholder="Optional"
          aria-invalid={errors.company ? "true" : "false"}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={inputClass}
        />
        {errors.company ? (
          <p id="company-error" className={errorClass}>
            {errors.company.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>
          What kind of project is this?
        </label>
        <select
          id="projectType"
          {...register("projectType")}
          aria-invalid={errors.projectType ? "true" : "false"}
          aria-describedby={errors.projectType ? "projectType-error" : undefined}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Choose one</option>
          <option value="document-assistant">Document assistant pilot</option>
          <option value="other-ai">Another AI feature or integration</option>
          <option value="not-sure">Not sure yet</option>
        </select>
        {errors.projectType ? (
          <p id="projectType-error" className={errorClass}>
            {errors.projectType.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="goal" className={labelClass}>
          What would you like to improve?{requiredMark}
        </label>
        <textarea
          id="goal"
          {...register("goal")}
          placeholder="Describe the task, who uses it, and what's slow or manual today"
          rows={5}
          required
          aria-invalid={errors.goal ? "true" : "false"}
          aria-describedby={errors.goal ? "goal-error" : undefined}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
        {errors.goal ? (
          <p id="goal-error" className={errorClass}>
            {errors.goal.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="tools" className={labelClass}>
          What tools or documents are involved?
        </label>
        <textarea
          id="tools"
          {...register("tools")}
          placeholder="Optional"
          rows={3}
          aria-invalid={errors.tools ? "true" : "false"}
          aria-describedby={errors.tools ? "tools-error" : undefined}
          className={`${inputClass} resize-y min-h-[80px]`}
        />
        {errors.tools ? (
          <p id="tools-error" className={errorClass}>
            {errors.tools.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget range, if known
        </label>
        <input
          id="budget"
          {...register("budget")}
          placeholder="Amount and currency, or not sure"
          aria-invalid={errors.budget ? "true" : "false"}
          aria-describedby={errors.budget ? "budget-error" : undefined}
          className={inputClass}
        />
        {errors.budget ? (
          <p id="budget-error" className={errorClass}>
            {errors.budget.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="timeline" className={labelClass}>
          Desired timeline
        </label>
        <input
          id="timeline"
          {...register("timeline")}
          placeholder="Optional"
          aria-invalid={errors.timeline ? "true" : "false"}
          aria-describedby={errors.timeline ? "timeline-error" : undefined}
          className={inputClass}
        />
        {errors.timeline ? (
          <p id="timeline-error" className={errorClass}>
            {errors.timeline.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot field: hidden from sighted and keyboard users, left for bots. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website_url">Leave this field empty</label>
        <input
          id="website_url"
          type="text"
          {...register("website_url")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <p className="text-[0.8rem] text-[var(--text-secondary)]">
        Please don&apos;t include confidential documents or credentials.
      </p>

      <button
        type="submit"
        disabled={isLoading}
        className={`px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white border-none rounded-lg font-[inherit] text-[0.9rem] font-medium transition-[background,opacity] duration-200 self-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
          isLoading ? "cursor-not-allowed opacity-60 hover:bg-[var(--accent)]" : "cursor-pointer"
        }`}
      >
        {isLoading ? "Sending..." : "Send project inquiry"}
      </button>

      {status === "success" ? (
        <div
          role="status"
          className="px-4 py-[0.875rem] rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[#16a34a] text-sm font-medium"
        >
          Thanks, your inquiry was sent. I&apos;ll review the fit and follow up about scope and
          next steps.
        </div>
      ) : null}

      {status === "error" ? (
        <div
          role="alert"
          className="px-4 py-[0.875rem] rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#dc2626] text-sm font-medium"
        >
          Your inquiry could not be sent. Your details are still in the form. Please try again, or{" "}
          <a href="mailto:brilianadeputra@gmail.com" className="underline">
            Email Billy
          </a>
          .
        </div>
      ) : null}
    </form>
  );
}
