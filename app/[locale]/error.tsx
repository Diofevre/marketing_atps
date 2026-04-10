"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F6F7]">
      <Container className="max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-[#1b0c25] mb-4">
          Something went wrong
        </h2>
        <p className="text-[#1b0c25]/60 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#1b0c25] text-white rounded-full hover:bg-[#1b0c25]/90 transition-colors font-medium"
        >
          Try again
        </button>
      </Container>
    </div>
  );
}
