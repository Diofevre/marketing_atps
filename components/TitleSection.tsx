export default function TitleSection({
  title,
  variant = "dark",
}: {
  title: string;
  className?: string;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-sm shrink-0 ${isLight ? "bg-white" : "bg-[#1b0c25]"}`}
      />
      <span
        className={`text-sm font-semibold uppercase tracking-wider ${isLight ? "text-white" : "text-[#1b0c25]"}`}
      >
        {title}
      </span>
    </div>
  );
}