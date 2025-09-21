import NotFoundClient from "@/components/NotFoundClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist on Brilian Ade Putra (Billy)'s portfolio website. Return to explore AI engineering projects and professional experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}
