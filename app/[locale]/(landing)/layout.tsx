import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}