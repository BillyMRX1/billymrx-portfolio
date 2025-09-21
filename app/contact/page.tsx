import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Brilian Ade Putra (Billy) for AI engineering opportunities, mobile app development projects, or professional networking in Tokyo, Japan.",
  keywords: [
    "Contact Billy",
    "Hire AI Engineer",
    "Mobile App Developer Tokyo",
    "Freelance Developer Japan",
    "AI Engineer Contact",
    "Brilian Ade Putra Contact",
    "Software Engineer Hire",
    "Tokyo Developer Network"
  ],
  openGraph: {
    title: "Contact Brilian Ade Putra (Billy) - AI Engineer Available for Hire",
    description: "Ready to collaborate? Contact AI Engineer Brilian Ade Putra for job opportunities, freelance projects, and professional networking in Tokyo.",
  },
  twitter: {
    title: "Contact Brilian Ade Putra (Billy) - AI Engineer Available for Hire",
    description: "Ready to collaborate? Contact AI Engineer Brilian Ade Putra for job opportunities, freelance projects, and professional networking in Tokyo.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 px-8">
      <h1 className="text-4xl font-bold text-neon mb-6 text-center">
        Contact Me
      </h1>
      <ContactForm />
    </div>
  );
}
