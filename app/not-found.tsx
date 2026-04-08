import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

// Returning index:false on a 404 page prevents search engines from keeping
// the 404 response in their index while still serving a useful page for users.
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for does not exist on MyATPS. Explore our ATPL preparation platform, blog, and latest aviation news instead.",
  robots: {
    index: false,
    follow: true,
  },
};

const SUGGESTED_LINKS: Array<{
  href: string;
  title: string;
  description: string;
}> = [
  {
    href: "/",
    title: "Home",
    description:
      "Discover the complete ATPL exam preparation platform — 20,000+ questions, aviation dictionary, live quizzes.",
  },
  {
    href: "/blog",
    title: "Blog",
    description:
      "Study tips, ATPL preparation strategies, and aviation insights for student pilots.",
  },
  {
    href: "/news",
    title: "News",
    description:
      "Latest MyATPS platform updates, new features, and EASA exam regulation changes.",
  },
  {
    href: "/contact",
    title: "Contact",
    description:
      "Get in touch with the MyATPS team for support, feedback, or partnership inquiries.",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center py-24 lg:py-32">
      <Container className="max-w-4xl">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]/60">
            Error 404
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b0c25] tracking-tight">
            This page doesn&apos;t exist
          </h1>
          <p className="text-base md:text-lg text-[#1b0c25]/70 max-w-2xl leading-relaxed">
            The URL you followed may be broken, or the page may have been moved.
            Here are a few places you can go instead.
          </p>
        </div>

        <nav
          aria-label="Suggested pages"
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {SUGGESTED_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-2 p-6 rounded-xl border border-[#1b0c25]/10 bg-white hover:border-[#1b0c25]/30 hover:shadow-sm transition-all"
            >
              <span className="text-lg font-semibold text-[#1b0c25] group-hover:underline">
                {link.title}
              </span>
              <span className="text-sm text-[#1b0c25]/60 leading-relaxed">
                {link.description}
              </span>
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
