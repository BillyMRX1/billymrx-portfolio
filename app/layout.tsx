import "./globals.css";
import type { Metadata } from "next";
import ClientParticles from "@/components/ClientParticles";
import Navbar from "@/components/Navbar";
import TerminalLauncher from "@/components/TerminalLauncher";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "BillyMRX | Cyberpunk Portfolio",
  description: "Android Developer turned AI Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white font-sans">
        <TerminalLauncher />
        <ClientParticles />
        <Navbar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
