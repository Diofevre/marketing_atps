import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware Link / redirect / useRouter / usePathname / getPathname.
 * Use these instead of next/link and next/navigation in any component that
 * links between localized pages — they automatically prepend the current
 * locale prefix when needed (French URLs get `/fr/...`, English URLs stay
 * at the root because we use `localePrefix: 'as-needed'`).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
