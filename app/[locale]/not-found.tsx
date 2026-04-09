import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

// Returning index:false on a 404 page prevents search engines from keeping
// the 404 response in their index while still serving a useful page for users.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");
  const tNav = await getTranslations("nav");

  const SUGGESTED_LINKS: Array<{
    href: string;
    title: string;
    description: string;
  }> = [
    {
      href: "/",
      title: t("home"),
      description: t("homeDescription"),
    },
    {
      href: "/blog",
      title: tNav("blog"),
      description: t("blogDescription"),
    },
    {
      href: "/news",
      title: tNav("news"),
      description: t("newsDescription"),
    },
    {
      href: "/contact",
      title: tNav("contact"),
      description: t("contactDescription"),
    },
  ];

  return (
    <div className="min-h-[70vh] flex items-center py-24 lg:py-32">
      <Container className="max-w-4xl">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]/60">
            {t("errorLabel")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1b0c25] tracking-tight">
            {t("title")}
          </h1>
          <p className="text-base md:text-lg text-[#1b0c25]/70 max-w-2xl leading-relaxed">
            {t("description")}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1b0c25] px-6 py-3 text-sm font-medium text-white hover:bg-[#1b0c25]/90 transition-colors"
          >
            {t("backHome")}
          </Link>
        </div>

        <nav
          aria-label={t("suggestedPagesLabel")}
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
