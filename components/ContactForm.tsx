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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  fontFamily: "inherit",
  fontSize: "0.9rem",
  background: "var(--input-bg)",
  color: "var(--text)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label
          htmlFor="from_name"
          style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 500,
            marginBottom: "0.4rem",
            color: "var(--text)",
          }}
        >
          Name
        </label>
        <input
          id="from_name"
          {...register("from_name")}
          placeholder="Your name"
          style={inputStyle}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--accent)";
            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px var(--accent-light)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--border)";
            (e.target as HTMLInputElement).style.boxShadow = "none";
          }}
        />
        {errors.from_name && (
          <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
            {errors.from_name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="from_email"
          style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 500,
            marginBottom: "0.4rem",
            color: "var(--text)",
          }}
        >
          Email
        </label>
        <input
          id="from_email"
          {...register("from_email")}
          placeholder="your@email.com"
          type="email"
          style={inputStyle}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--accent)";
            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px var(--accent-light)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--border)";
            (e.target as HTMLInputElement).style.boxShadow = "none";
          }}
        />
        {errors.from_email && (
          <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
            {errors.from_email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          style={{
            display: "block",
            fontSize: "0.8rem",
            fontWeight: 500,
            marginBottom: "0.4rem",
            color: "var(--text)",
          }}
        >
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          placeholder="What's on your mind?"
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
          onFocus={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "var(--accent)";
            (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px var(--accent-light)";
          }}
          onBlur={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = "var(--border)";
            (e.target as HTMLTextAreaElement).style.boxShadow = "none";
          }}
        />
        {errors.message && (
          <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "0.75rem 2rem",
          background: "var(--accent)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontFamily: "inherit",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.6 : 1,
          transition: "background 0.2s, opacity 0.2s",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading")
            (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
        }}
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <div
          style={{
            padding: "0.875rem 1rem",
            borderRadius: "8px",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            color: "#16a34a",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Message sent! I will get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            padding: "0.875rem 1rem",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#dc2626",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
