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

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (isSending) return;

    setIsSending(true);
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
      setSent(true);
      reset();
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto flex flex-col gap-4 text-left"
    >
      <div>
        <input
          {...register("from_name")}
          placeholder="Your Name"
          className="w-full bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
        />
        {errors.from_name && (
          <p className="text-red-400 text-sm mt-1">{errors.from_name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("from_email")}
          placeholder="Your Email"
          type="email"
          className="w-full bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
        />
        {errors.from_email && (
          <p className="text-red-400 text-sm mt-1">{errors.from_email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("message")}
          placeholder="Your Message"
          rows={6}
          className="w-full bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="px-6 py-2 bg-neon text-black font-bold rounded hover:brightness-125 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? "Sending..." : "Send"}
      </button>

      {sent && (
        <p className="text-green-400 mt-2">Message sent successfully!</p>
      )}
    </form>
  );
}
