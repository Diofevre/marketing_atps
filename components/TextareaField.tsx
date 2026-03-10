// TextareaField.tsx
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

export default function TextareaField({
  label,
  placeholder,
  className,
  ...rest
}: {
  label: string;
  placeholder: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      <Label className="text-sm sm:text-[15px] font-medium leading-[26px] text-[#1B0C25]">
        {label}
      </Label>
      <Textarea
        placeholder={placeholder}
        className={cn(
          "bg-[#F9F9F9] border-[#1B0C25]/10 focus-visible:ring-[#1B0C25]/20 focus-visible:border-[#1B0C25]/30 w-full min-h-[120px] rounded-[10px] text-sm sm:text-base resize-y",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
