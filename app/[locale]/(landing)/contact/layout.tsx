import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with MyATPS",
  description:
    "Have a question about MyATPS? Contact our team for support, partnership inquiries, or feedback about the ATPL preparation platform.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MyATPS — We're Here to Help",
    description:
      "Reach out to the MyATPS team for support, feedback, or partnership inquiries.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
