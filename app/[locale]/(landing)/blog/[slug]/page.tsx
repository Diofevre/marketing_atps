import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeInUp, ScaleIn, StaggerContainer } from "@/lib/motion";
import RelatedPosts from "@/components/sections/RelatedPosts";
import BlogSidebar from "@/components/sections/BlogSidebar";
import { blogService } from "@/lib/api";
import {
  transformBlogArticle,
  transformBlogArticles,
  unwrapBlogArticles,
} from "@/lib/api/transformers";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://myatps.com";

interface PageProps {
  // Next.js 16 app-router dynamic params are async. Both `locale` (from the
  // `[locale]` segment in the URL tree) and `slug` (from the `[slug]`
  // segment here) arrive together.
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const response = await blogService.getArticleBySlug(slug);

  if (response.error || !response.data) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const article = response.data;
  // When the locale is the default (en), the URL has no prefix; for fr,
  // it's prefixed with `/fr`. Canonical must match the rendered URL
  // exactly so Google does not treat `/fr/blog/<slug>` and `/blog/<slug>`
  // as duplicates of each other.
  const pathPrefix = locale === "en" ? "" : `/${locale}`;
  const articleUrl = `${pathPrefix}/blog/${article.slug}`;

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || "",
    keywords: article.seoKeywords?.join(", "),
    alternates: {
      canonical: articleUrl,
      // Articles are currently monolingual (backend returns the content
      // in the authoring language). We still self-reference the current
      // locale as the only alternate — adding a cross-locale alternate
      // that 404s would be worse than omitting it. Once the backend
      // returns per-locale article content we can expand this.
      languages: {
        [locale]: articleUrl,
      },
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || "",
      url: articleUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: article.coverImage ? [article.coverImage] : [],
      type: "article",
      publishedTime: article.publishedAt || undefined,
    },
  };
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;
  const response = await blogService.getArticleBySlug(slug);

  if (response.error || !response.data) {
    notFound();
  }

  const article = response.data;
  const blog = transformBlogArticle(article);

  const relatedResponse = await blogService.getRelatedArticles(article.id, 3);
  const relatedArticles = relatedResponse.data
    ? unwrapBlogArticles(relatedResponse.data)
    : [];
  const relatedPosts = transformBlogArticles(relatedArticles);

  const displayImage =
    blog.detailImage || blog.imageBlog || "/assets/placeholder.png";

  blogService.incrementViewCount(article.id);

  // JSON-LD Article schema for rich snippets in search results. Also emit a
  // BreadcrumbList so Google can render the hierarchy (Home > Blog > Article).
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || "",
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: article.author
      ? {
          "@type": "Person",
          name: `${article.author.firstName} ${article.author.lastName}`.trim(),
        }
      : { "@type": "Organization", name: "MyATPS" },
    publisher: {
      "@type": "Organization",
      name: "MyATPS",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo-myatps.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: article.seoKeywords?.join(", ") || article.tags?.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/blog/${article.slug}`,
      },
    ],
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container className="pt-[140px] pb-[80px]">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div className="min-w-0">
            <div className="text-start flex flex-col items-start gap-6 mb-10">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1b0c25]">
                  <span>{blog.title}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span>{blog.date}</span>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-bold text-[#1b0c25] leading-[36px] md:leading-[36px] lg:leading-[46px]">
                  {blog.description}
                </h1>
              </FadeInUp>

              {blog.author && (
                <FadeInUp delay={0.2} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    {blog.author.avatar ? (
                      <Image
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-500 font-bold">
                        {blog.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#1b0c25]">
                      {blog.author.name}
                    </p>
                    <p className="text-xs text-gray-500">Author</p>
                  </div>
                </FadeInUp>
              )}
            </div>

            <ScaleIn
              delay={0.3}
              className="w-full rounded-2xl overflow-hidden relative aspect-video mb-12"
            >
              <Image
                src={displayImage}
                alt="blog"
                fill
                className="object-cover"
              />
            </ScaleIn>

            {blog.sections && blog.sections.length > 0 ? (
              <div className="space-y-10">
                {blog.sections.map((section, index) => (
                  <div key={section.id} className="space-y-5">
                    {section.title && (
                      <h2 className="text-[#1b0c25] text-[28px] leading-[34px] sm:text-[32px] sm:leading-[38px] font-semibold tracking-tight">
                        {section.title}
                      </h2>
                    )}

                    {section.image && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={section.image}
                          alt={section.title || `Section ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 720px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div
                      className="text-[#1b0c25]/70 text-[14px] leading-[22px] prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-[#1b0c25]/80">
                {blog.content ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                ) : (
                  <p>{blog.description}</p>
                )}
              </div>
            )}
          </div>

          <div className="lg:block">
            <BlogSidebar
              currentPostId={blog.id}
              author={blog.author}
              tags={blog.tags}
              title={blog.description}
            />
          </div>
        </StaggerContainer>
      </Container>

      <div className="w-full py-20">
        <Container>
          <RelatedPosts posts={relatedPosts} />
        </Container>
      </div>
    </div>
  );
}
