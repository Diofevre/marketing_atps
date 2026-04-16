// InputField.tsx
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

export default function InputField({
  label,
  placeholder,
  className,
  ...rest
}: {
  label: string;
  placeholder: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      <Label className="text-sm sm:text-[15px] font-medium leading-[26px] text-[#1b0c25]">
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        className={cn(
          "bg-[#F9F9F9] border-[#1b0c25]/10 focus-visible:ring-brand/20 focus-visible:border-[#1b0c25]/30 w-full h-11 sm:h-12 rounded-[10px] text-sm sm:text-base",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
