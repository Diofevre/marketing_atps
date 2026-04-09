import type { MetadataRoute } from "next";
import { blogService, newsService } from "@/lib/api";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

// Generate on every request so newly published articles appear immediately
// in the sitemap, and so we don't serve a stale/empty sitemap if the API was
// unreachable at build time.
export const dynamic = "force-dynamic";

/**
 * Build a sitemap entry with hreflang alternates so Google knows the
 * English and French versions of the same page are equivalent. With
 * `localePrefix: 'as-needed'`, the default locale (en) lives at the root
 * path and the non-default locales (fr) get a `/<locale>` prefix.
 */
function localizedEntry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}${path}`;
  }
  // `x-default` is the fallback Google uses when no explicit hreflang
  // matches the user's language preference. Always point it at the
  // default locale URL.
  languages["x-default"] = `${SITE_URL}${path}`;

  return {
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/news", changeFrequency: "daily", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

// Hard cap on pages we walk per resource so a misbehaving API can never
// turn the sitemap build into an infinite loop. At 50 × 50 = 2500 entries
// per resource we have plenty of headroom before hitting Google's 50k
// per-sitemap limit.
const MAX_PAGES_PER_RESOURCE = 50;
// The backend rejects limit values above 50 with "Paramètres de requête
// invalides", so we cap at 50 (the server-side max).
const PAGE_SIZE = 50;

async function fetchAllBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (let page = 1; page <= MAX_PAGES_PER_RESOURCE; page++) {
    const res = await blogService.getArticles({
      page,
      limit: PAGE_SIZE,
      status: "published",
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    if (res.error) {
      console.error(
        `[sitemap] blogService.getArticles failed at page ${page}:`,
        res.error,
      );
      break;
    }

    for (const article of res.data.articles) {
      entries.push(
        localizedEntry(
          `/blog/${article.slug}`,
          "weekly",
          0.7,
          new Date(
            article.updatedAt || article.publishedAt || article.createdAt,
          ),
        ),
      );
    }

    if (!res.data.pagination.hasNext) break;
  }

  return entries;
}

async function fetchAllNewsEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (let page = 1; page <= MAX_PAGES_PER_RESOURCE; page++) {
    const res = await newsService.getNews({
      page,
      limit: PAGE_SIZE,
      sortBy: "publishedAt",
      sortOrder: "desc",
    });

    if (res.error) {
      console.error(
        `[sitemap] newsService.getNews failed at page ${page}:`,
        res.error,
      );
      break;
    }

    for (const item of res.data.news) {
      entries.push(
        localizedEntry(
          `/news/${item.slug}`,
          "weekly",
          0.7,
          new Date(item.updatedAt || item.publishedAt || item.createdAt),
        ),
      );
    }

    if (!res.data.pagination.hasNext) break;
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PATHS.map((entry) =>
    localizedEntry(entry.path, entry.changeFrequency, entry.priority),
  );

  const [blogEntries, newsEntries] = await Promise.all([
    fetchAllBlogEntries(),
    fetchAllNewsEntries(),
  ]);

  return [...staticEntries, ...blogEntries, ...newsEntries];
}
