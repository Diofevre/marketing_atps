import { Container } from "@/components/ui/container";

export default function LandingLoading() {
  return (
    <div className="pt-[140px] pb-[80px]">
      <Container>
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="h-8 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-100 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
