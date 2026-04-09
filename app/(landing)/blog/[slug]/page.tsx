import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeInUp, ScaleIn, StaggerContainer } from "@/lib/motion";
import RelatedPosts from "@/components/sections/RelatedPosts";
import BlogSidebar from "@/components/sections/BlogSidebar";
import { blogService } from "@/lib/api";
import {
  transformBlogArticle,
  transformBlogArticles,
} from "@/lib/api/transformers";
import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await blogService.getArticleBySlug(slug);

  if (response.error || !response.data) {
    return { title: "Article not found" };
  }

  const article = response.data;

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt || "",
    keywords: article.seoKeywords?.join(", "),
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || "",
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const relatedData = relatedResponse.data as any;
  const relatedArticles = relatedData?.articles || [];
  const relatedPosts = transformBlogArticles(relatedArticles);

  const displayImage =
    blog.detailImage || blog.imageBlog || "/assets/placeholder.png";

  blogService.incrementViewCount(article.id);

  return (
    <div className="pb-20">
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
