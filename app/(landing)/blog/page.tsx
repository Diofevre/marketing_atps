import BlogList from "@/components/sections/BlogList";
import { Container } from "@/components/ui/container";
import { FadeInUp, StaggerContainer } from "@/lib/motion";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20">
      <Container className="px-8 lg:px-6">
        <StaggerContainer className="flex flex-col items-start gap-4 mb-12">
          <FadeInUp>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#1B0C25] rounded-sm shrink-0" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1B0C25]">
                Our Blog
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B0C25] tracking-tight">
              Latest News & Insights
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              Discover the latest trends in aviation, safety procedures, and
              pilot training resources.
            </p>
          </FadeInUp>
        </StaggerContainer>

        <BlogList />
      </Container>
    </div>
  );
}
