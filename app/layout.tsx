import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyATPS — The Complete ATPL Training Platform",
  description: "Prepare for your ATPL exams with AI-powered quizzes, an ATC simulator, and a built-in AI tutor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased bg-[#F7F6F7]`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
