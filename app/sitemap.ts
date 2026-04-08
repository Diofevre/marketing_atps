import type { MetadataRoute } from "next";
import { blogService, newsService } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

// Generate on every request so newly published articles appear immediately
// in the sitemap, and so we don't serve a stale/empty sitemap if the API was
// unreachable at build time.
export const dynamic = "force-dynamic";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/blog`,
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/news`,
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/contact`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: "yearly",
    priority: 0.3,
  },
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
      entries.push({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(
          article.updatedAt || article.publishedAt || article.createdAt,
        ),
        changeFrequency: "weekly",
        priority: 0.7,
      });
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
      entries.push({
        url: `${SITE_URL}/news/${item.slug}`,
        lastModified: new Date(
          item.updatedAt || item.publishedAt || item.createdAt,
        ),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    if (!res.data.pagination.hasNext) break;
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogEntries, newsEntries] = await Promise.all([
    fetchAllBlogEntries(),
    fetchAllNewsEntries(),
  ]);

  return [...STATIC_ROUTES, ...blogEntries, ...newsEntries];
}
