import { cn } from "@/lib/utils";

interface DotLabelProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}

export default function DotLabel({
  children,
  variant = "dark",
  className,
}: DotLabelProps) {
  const isDark = variant === "dark";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-3 h-3 rounded-sm shrink-0",
          isDark ? "bg-[#1b0c25]" : "bg-white",
        )}
      />
      <span
        className={cn(
          "text-sm font-semibold uppercase tracking-wider",
          isDark ? "text-[#1b0c25]" : "text-white",
        )}
      >
        {children}
      </span>
    </div>
  );
}
