"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  from_name: z.string().min(2, "Name must be at least 2 characters"),
  from_email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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

const inputClass =
  "w-full px-4 py-3 border border-[var(--border)] rounded-lg font-[inherit] text-[0.9rem] bg-[var(--input-bg)] text-[var(--text)] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-light)]";

const labelClass = "block text-[0.8rem] font-medium mb-[0.4rem] text-[var(--text)]";

const errorClass = "text-[#ef4444] text-[0.8rem] mt-[0.3rem]";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (data: FormData) => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      const emailjs = await loadEmailClient();
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.from_name,
          email: data.from_email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label htmlFor="from_name" className={labelClass}>
          Name
        </label>
        <input
          id="from_name"
          {...register("from_name")}
          placeholder="Your name"
          className={inputClass}
        />
        {errors.from_name ? (
          <p className={errorClass}>{errors.from_name.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="from_email" className={labelClass}>
          Email
        </label>
        <input
          id="from_email"
          {...register("from_email")}
          placeholder="your@email.com"
          type="email"
          className={inputClass}
        />
        {errors.from_email ? (
          <p className={errorClass}>{errors.from_email.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          placeholder="What's on your mind?"
          rows={5}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
        {errors.message ? (
          <p className={errorClass}>{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`px-8 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white border-none rounded-lg font-[inherit] text-[0.9rem] font-medium transition-[background,opacity] duration-200 self-start ${
          isLoading ? "cursor-not-allowed opacity-60 hover:bg-[var(--accent)]" : "cursor-pointer"
        }`}
      >
        {isLoading ? "Sending..." : "Send message"}
      </button>

      {status === "success" ? (
        <div className="px-4 py-[0.875rem] rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[#16a34a] text-sm font-medium">
          Message sent! I will get back to you soon.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="px-4 py-[0.875rem] rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#dc2626] text-sm font-medium">
          Something went wrong. Please try again.
        </div>
      ) : null}
    </form>
  );
}
