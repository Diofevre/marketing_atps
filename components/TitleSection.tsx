import React from "react";

export default function TitleSection({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div>
      <p
        className={`px-[14px] py-[6px] text-[13px] rounded-full border border-[#d37bff] bg-white text-[#1b0c25] font-medium uppercase ${className}`}
      >
        {title}
      </p>
    </div>
  );
}
