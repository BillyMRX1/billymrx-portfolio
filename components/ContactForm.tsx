"use client";

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useState } from "react";

type FormData = {
  from_name: string;
  from_email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
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
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto flex flex-col gap-4 text-left"
    >
      <input
        {...register("from_name", { required: true })}
        placeholder="Your Name"
        className="bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
      />
      <input
        {...register("from_email", { required: true })}
        placeholder="Your Email"
        type="email"
        className="bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
      />
      <textarea
        {...register("message", { required: true })}
        placeholder="Your Message"
        rows={6}
        className="bg-black border border-neon text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-neon"
      />

      <button
        type="submit"
        className="px-6 py-2 bg-neon text-black font-bold rounded hover:brightness-125 transition"
      >
        Send
      </button>

      {sent && (
        <p className="text-green-400 mt-2">Message sent successfully!</p>
      )}
    </form>
  );
}
