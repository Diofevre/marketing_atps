"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Language switcher displayed in the Navigation bar and the mobile menu.
 *
 * - Uses `@/i18n/navigation` hooks (NOT `next/navigation`) so the pathname
 *   swap is locale-aware: switching from `/fr/blog/my-post` to English
 *   lands on `/blog/my-post`, not on a 404.
 * - Preserves the current route segment when switching, so a reader on
 *   `/news/foo` in French lands on `/news/foo` in English — same article,
 *   different locale.
 * - `router.replace()` instead of `push()` keeps the browser history
 *   clean (the current page is just re-rendered in the other language,
 *   no new history entry).
 * - Uses `startTransition` so React doesn't block the UI during the
 *   server round-trip; the switch feels instant even on slow networks.
 * - next-intl automatically writes the `NEXT_LOCALE` cookie on the
 *   response, so the next visit from the same browser remembers the
 *   chosen locale.
 */
interface LocaleSwitcherProps {
  /**
   * Visual variant:
   * - `desktop` — compact segmented control for the Navigation bar
   * - `mobile`  — full-width for the mobile menu overlay
   */
  variant?: "desktop" | "mobile";
  className?: string;
}

export default function LocaleSwitcher({
  variant = "desktop",
  className = "",
}: LocaleSwitcherProps) {
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === activeLocale) return;
    startTransition(() => {
      // `router.replace` from @/i18n/navigation takes the locale as an
      // option and rewrites the current pathname under the target locale.
      // The pathname here is already the "canonical" one without any
      // locale prefix (next-intl strips it on `usePathname`), so passing
      // it as-is with `{ locale }` produces `/fr/<path>` or `/<path>`
      // depending on the target.
      router.replace(pathname, { locale: nextLocale });
    });
  };

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center gap-2 ${className}`}
        aria-label={t("languageLabel")}
      >
        {routing.locales.map((locale) => {
          const isActive = locale === activeLocale;
          return (
            <button
              key={locale}
              type="button"
              onClick={() => handleSwitch(locale)}
              disabled={isPending}
              aria-pressed={isActive}
              aria-label={t(locale === "en" ? "languageEnglish" : "languageFrench")}
              className={`flex-1 py-[10px] rounded-[10px] text-[14px] font-medium uppercase tracking-wide transition-all ${
                isActive
                  ? "bg-[#1b0c25] text-white"
                  : "bg-[#1b0c25]/5 text-[#1b0c25] opacity-60 hover:opacity-100"
              }`}
            >
              {locale}
            </button>
          );
        })}
      </div>
    );
  }

  // Desktop variant: compact pill with EN | FR
  return (
    <div
      className={`flex items-center gap-[2px] p-[2px] rounded-[8px] bg-[#1b0c25]/5 ${className}`}
      aria-label={t("languageLabel")}
    >
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSwitch(locale)}
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={t(locale === "en" ? "languageEnglish" : "languageFrench")}
            className={`px-[10px] py-[4px] rounded-[6px] text-[11px] font-semibold uppercase tracking-wider transition-all ${
              isActive
                ? "bg-[#1b0c25] text-white shadow-sm"
                : "text-[#1b0c25] opacity-50 hover:opacity-80"
            }`}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
