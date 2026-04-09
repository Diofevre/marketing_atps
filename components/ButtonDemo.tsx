import { Button } from "./ui/button";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── Primitive réutilisable ────────────────────────────────────── */
interface AnimatedButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: "dark" | "light" | "blur";
  className?: string;
  target?: string;
}

export function AnimatedButton({
  children,
  href,
  variant = "dark",
  className,
  target,
}: AnimatedButtonProps) {
  const variantClass =
    variant === "dark"
      ? "bg-[#1b0c25] hover:bg-[#1b0c25] shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-[6px]"
      : variant === "blur"
        ? "bg-white hover:bg-white/90 border border-white text-black backdrop-blur-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        : "bg-white hover:bg-white border border-gray-100 text-black";

  return (
    <Link href={href} target={target}>
      <Button
        className={cn(
          "group h-10 rounded-[8px] text-sm font-medium",
          variantClass,
          className,
        )}
      >
        <span className="flex flex-col items-center h-[20px] overflow-hidden">
          <span className="block h-[20px] leading-[20px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            {children}
          </span>
          <span className="block h-[20px] leading-[20px] transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            {children}
          </span>
        </span>
      </Button>
    </Link>
  );
}

/* ── Compositions existantes ───────────────────────────────────── */
export function ButtonDemo() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[12px] w-full sm:w-auto">
      <AnimatedButton
        href={`${APP_URL}/signin`}
        target="_blank"
        variant="dark"
        className="w-full sm:w-[110px]"
      >
        Get Started
      </AnimatedButton>
      <AnimatedButton
        href="/contact"
        variant="light"
        className="w-full sm:w-[110px]"
      >
        Demo
      </AnimatedButton>
    </div>
  );
}

export function ButtonDemoBlur() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[12px] w-full sm:w-auto">
      <AnimatedButton
        href={`${APP_URL}/signin`}
        target="_blank"
        variant="dark"
        className="w-full sm:w-[110px]"
      >
        Get Started
      </AnimatedButton>
      <AnimatedButton
        href="/contact"
        variant="blur"
        className="w-full sm:w-[110px]"
      >
        Demo
      </AnimatedButton>
    </div>
  );
}

export function ButtonDemoVarient() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[12px] w-full sm:w-auto">
      <AnimatedButton
        href={`${APP_URL}/signin`}
        target="_blank"
        variant="dark"
        className="w-full sm:w-[110px]"
      >
        Get Started
      </AnimatedButton>
      <AnimatedButton
        href="/contact"
        variant="light"
        className="w-full sm:w-[130px]"
      >
        Book a Demo
      </AnimatedButton>
    </div>
  );
}

export default ButtonDemo;
