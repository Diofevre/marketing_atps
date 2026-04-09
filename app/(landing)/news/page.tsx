import NewsList from "@/components/sections/NewsList";
import { Container } from "@/components/ui/container";
import { FadeInUp, StaggerContainer } from "@/lib/motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News — Latest Updates from MyATPS",
  description:
    "Stay up to date with the latest MyATPS platform updates, new features, aviation industry news, and EASA exam regulation changes.",
  openGraph: {
    title: "MyATPS News — Platform Updates & Aviation News",
    description:
      "The latest updates from MyATPS: new features, aviation news, and EASA exam changes.",
  },
};

export default function NewsPage() {
  return (
    <div className="pt-32 pb-20">
      <Container className="px-8 lg:px-6">
        <StaggerContainer className="flex flex-col items-start gap-2 mb-12">
          <FadeInUp>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#1b0c25] rounded-sm shrink-0" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1b0c25]">
                Our News
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b0c25] tracking-tight">
              News & Insights
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-base text-gray-500 max-w-xl leading-relaxed">
              Stay informed with the latest trends in EdTech, security, and
              online learning.
            </p>
          </FadeInUp>
        </StaggerContainer>

        <NewsList />
      </Container>
    </div>
  );
}
