import { NextResponse } from "next/server";
import { blogService, newsService } from "@/lib/api";

/**
 * IndexNow endpoint — pings IndexNow (Bing, Yandex, Seznam, Naver, Yep…)
 * with every public URL on the site so new and updated pages get
 * discovered much faster than waiting for the next scheduled crawl.
 *
 * IndexNow is NOT used by Google — Google uses its own crawl signals
 * and the Search Console "Request indexing" button for that.
 *
 * Usage:
 *   curl "https://myatps.com/api/indexnow?key=<INDEXNOW_SECRET>"
 *
 * Setup:
 *   1. Key file lives at /public/<KEY>.txt and is served at
 *      https://myatps.com/<KEY>.txt so IndexNow can validate ownership.
 *   2. Set INDEXNOW_SECRET in the Vercel env (Production + Preview) to
 *      any value you want — it gates this endpoint so random traffic
 *      can't trigger bulk re-crawls.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

// The IndexNow key (matches /public/<KEY>.txt) is safe to ship in the
// code because IndexNow requires the key file to be publicly hostable
// at the site root as the proof-of-ownership mechanism.
const INDEXNOW_KEY = "2d70d7c278094439b16beacc91abbb1b";
const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// One endpoint fan-outs to every participating search engine.
const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

const STATIC_URLS = [
  `${SITE_URL}`,
  `${SITE_URL}/pricing`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/news`,
  `${SITE_URL}/enterprise`,
  `${SITE_URL}/enterprise/procteo`,
  `${SITE_URL}/enterprise/demo`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/privacy`,
];

async function collectDynamicUrls(): Promise<string[]> {
  const urls: string[] = [];

  // Blog article slugs
  for (let page = 1; page <= 50; page++) {
    const res = await blogService.getArticles({
      page,
      limit: 50,
      status: "published",
      sortBy: "publishedAt",
      sortOrder: "desc",
    });
    if (res.error) {
      console.error(
        `[indexnow] blogService.getArticles failed at page ${page}:`,
        res.error,
      );
      break;
    }
    for (const article of res.data.articles) {
      urls.push(`${SITE_URL}/blog/${article.slug}`);
    }
    if (!res.data.pagination.hasNext) break;
  }

  // News item slugs
  for (let page = 1; page <= 50; page++) {
    const res = await newsService.getNews({
      page,
      limit: 50,
      sortBy: "publishedAt",
      sortOrder: "desc",
    });
    if (res.error) {
      console.error(
        `[indexnow] newsService.getNews failed at page ${page}:`,
        res.error,
      );
      break;
    }
    for (const item of res.data.news) {
      urls.push(`${SITE_URL}/news/${item.slug}`);
    }
    if (!res.data.pagination.hasNext) break;
  }

  return urls;
}

async function submitBatchToEndpoint(
  endpoint: string,
  urls: string[],
): Promise<{ endpoint: string; status: number; ok: boolean }> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: urls,
      }),
    });
    return {
      endpoint,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    console.error(`[indexnow] POST ${endpoint} failed:`, error);
    return { endpoint, status: 0, ok: false };
  }
}

function isAuthorized(request: Request): boolean {
  // Two auth paths:
  //   1. Vercel Cron sends `Authorization: Bearer $CRON_SECRET` on every
  //      scheduled invocation. Vercel generates CRON_SECRET automatically
  //      when you enable crons in vercel.json and exposes it as an env var.
  //   2. Manual trigger from a human or another system uses
  //      ?key=$INDEXNOW_SECRET so we can re-index on demand without
  //      touching the Vercel dashboard.
  const cronSecret = process.env.CRON_SECRET;
  const manualSecret = process.env.INDEXNOW_SECRET;

  const authHeader = request.headers.get("authorization") ?? "";
  if (
    cronSecret &&
    authHeader === `Bearer ${cronSecret}`
  ) {
    return true;
  }

  const url = new URL(request.url);
  const providedKey = url.searchParams.get("key");
  if (manualSecret && providedKey === manualSecret) {
    return true;
  }

  return false;
}

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET && !process.env.INDEXNOW_SECRET) {
    return NextResponse.json(
      {
        error:
          "Neither CRON_SECRET nor INDEXNOW_SECRET is set on the server — aborting to prevent open abuse.",
      },
      { status: 503 },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dynamicUrls = await collectDynamicUrls();
  const allUrls = [...STATIC_URLS, ...dynamicUrls];

  // IndexNow allows up to 10,000 URLs per batch. We're nowhere near that
  // but chunk anyway so a future 5,000-article sitemap still works.
  const BATCH_SIZE = 9000;
  const batches: string[][] = [];
  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    batches.push(allUrls.slice(i, i + BATCH_SIZE));
  }

  const results = [];
  for (const batch of batches) {
    for (const endpoint of INDEXNOW_ENDPOINTS) {
      results.push(await submitBatchToEndpoint(endpoint, batch));
    }
  }

  return NextResponse.json(
    {
      submitted: allUrls.length,
      batches: batches.length,
      results,
      keyLocation: INDEXNOW_KEY_LOCATION,
    },
    { status: 200 },
  );
}
