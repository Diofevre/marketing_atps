type SvgProps = React.SVGProps<SVGSVGElement>;

type BalloonPalette = {
  top: string;
  mid: string;
  bottom: string;
};

const BALLOON_PALETTES: Record<"pink" | "violet" | "peach", BalloonPalette> = {
  pink: { top: "#ff7ec8", mid: "#c34f96", bottom: "#8a2e6c" },
  violet: { top: "#d37bff", mid: "#9b4cd9", bottom: "#5a1f8a" },
  peach: { top: "#ffc49a", mid: "#f28a5b", bottom: "#b4562f" },
};

export function HotAirBalloon({
  variant = "pink",
  ...props
}: SvgProps & { variant?: keyof typeof BALLOON_PALETTES }) {
  const gradId = `balloon-env-${variant}`;
  const highlightId = `balloon-stripe-${variant}`;
  const palette = BALLOON_PALETTES[variant];

  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="45%" stopColor={palette.mid} />
          <stop offset="100%" stopColor={palette.bottom} />
        </linearGradient>
        <linearGradient id={highlightId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2fb" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffb9e0" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M80 6c-38 0-68 28-68 68 0 30 18 56 42 66l9 12h34l9-12c24-10 42-36 42-66 0-40-30-68-68-68z"
        fill={`url(#${gradId})`}
      />
      <path d="M80 6v138" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.2" />
      <path
        d="M52 12c-10 18-16 40-16 62s6 44 16 62"
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M108 12c10 18 16 40 16 62s-6 44-16 62"
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        fill="none"
      />
      <ellipse cx="58" cy="52" rx="14" ry="30" fill={`url(#${highlightId})`} opacity="0.55" />
      <path
        d="M56 152l12 40M104 152L92 192M80 154v38"
        stroke="#1b0c25"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <rect x="62" y="190" width="36" height="22" rx="3" fill="#4a2b14" />
      <path
        d="M62 196h36M62 202h36M70 190v22M80 190v22M90 190v22"
        stroke="#2f1a0c"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * Realistic A320-style airliner — side view, cruise pose.
 *
 * Detailed silhouette with proper Airbus proportions: nose curve, cockpit
 * window cluster, full cabin window strip, swept wing with flap track
 * fairings, CFM56 engine pod, tail with brand-color accent, soft drop
 * shadow under the belly, and a long fading contrail behind the engine.
 */
export function RealisticAirliner(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 640 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Aluminum fuselage gradient (sun-lit top, shadowed belly) */}
        <linearGradient id="airliner-fuse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Wing gradient — slightly darker, top-down lighting */}
        <linearGradient id="airliner-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Engine cowling gradient */}
        <linearGradient id="airliner-engine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Tail fin brand accent (pink → violet, brand colors) */}
        <linearGradient id="airliner-tail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff49d4" />
          <stop offset="60%" stopColor="#c34f96" />
          <stop offset="100%" stopColor="#80a9fc" />
        </linearGradient>

        {/* Belly shadow */}
        <radialGradient id="airliner-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1b0c25" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1b0c25" stopOpacity="0" />
        </radialGradient>

        {/* Contrail — long horizontal fade */}
        <linearGradient id="airliner-contrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="airliner-contrail-thin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>

        {/* Soft glow for cockpit windows */}
        <linearGradient id="airliner-cockpit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1e3b" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>

      {/* ====== Drop shadow under belly ====== */}
      <ellipse
        cx="370"
        cy="148"
        rx="180"
        ry="9"
        fill="url(#airliner-shadow)"
      />

      {/* ====== Contrail (long, behind aircraft) ====== */}
      {/* Main thick contrail */}
      <path
        d="M0 96 Q120 92 240 96 L240 102 Q120 106 0 102 Z"
        fill="url(#airliner-contrail)"
      />
      {/* Secondary thin wisp slightly offset */}
      <path
        d="M0 110 Q140 108 250 112"
        stroke="url(#airliner-contrail-thin)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Dispersing puffs */}
      <circle cx="60" cy="92" r="6" fill="#ffffff" opacity="0.18" />
      <circle cx="100" cy="100" r="5" fill="#ffffff" opacity="0.22" />
      <circle cx="160" cy="94" r="7" fill="#ffffff" opacity="0.28" />
      <circle cx="200" cy="103" r="4" fill="#ffffff" opacity="0.32" />

      {/* ====== Vertical stabilizer (tail fin) ====== */}
      <path
        d="M250 96 L240 38 L264 38 L294 96 Z"
        fill="url(#airliner-tail)"
      />
      {/* Tail leading edge highlight */}
      <path
        d="M252 92 L244 44"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      {/* Tail brand stripe accent */}
      <path
        d="M254 70 L284 90"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />

      {/* ====== Horizontal stabilizers ====== */}
      <path
        d="M260 92 L228 78 L296 78 Z"
        fill="url(#airliner-wing)"
      />
      <path
        d="M260 92 L296 78"
        stroke="#1b0c25"
        strokeOpacity="0.2"
        strokeWidth="0.8"
      />

      {/* ====== Fuselage ====== */}
      <path
        d="M270 92 Q300 76 360 72 L500 70 Q560 70 590 78 Q608 84 614 96 Q608 108 590 114 Q560 122 500 122 L360 120 Q300 116 270 100 Z"
        fill="url(#airliner-fuse)"
      />

      {/* Belly highlight line */}
      <path
        d="M310 116 Q420 122 580 116"
        stroke="#1b0c25"
        strokeOpacity="0.18"
        strokeWidth="1"
        fill="none"
      />
      {/* Top fuselage highlight */}
      <path
        d="M320 78 Q420 73 560 78"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        fill="none"
      />

      {/* ====== Cockpit windows (Airbus 3-pane) ====== */}
      {/* Nose cone slight darkening (radome) */}
      <path
        d="M598 84 Q610 88 614 96 Q610 104 598 108 Q592 96 598 84 Z"
        fill="#0f172a"
        fillOpacity="0.18"
      />
      {/* Front windshield */}
      <path
        d="M580 80 Q598 80 606 88 L596 92 L578 92 Z"
        fill="url(#airliner-cockpit)"
      />
      {/* Side cockpit windows */}
      <path
        d="M566 82 L578 82 L578 92 L566 92 Z"
        fill="url(#airliner-cockpit)"
      />
      <path
        d="M552 84 L564 84 L564 92 L552 92 Z"
        fill="url(#airliner-cockpit)"
      />
      {/* Window frame highlights */}
      <path
        d="M566 82 L578 82 M578 82 L596 88"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="0.7"
      />

      {/* ====== Cabin window strip ====== */}
      <g fill="#0b1e3b" fillOpacity="0.78">
        {Array.from({ length: 32 }).map((_, i) => (
          <rect
            key={i}
            x={310 + i * 7.2}
            y={88}
            width={3.2}
            height={3.2}
            rx={0.5}
          />
        ))}
      </g>

      {/* ====== Door indicators ====== */}
      <rect
        x="316"
        y="84"
        width="6"
        height="14"
        rx="0.8"
        fill="#1b0c25"
        fillOpacity="0.35"
      />
      <rect
        x="382"
        y="84"
        width="6"
        height="14"
        rx="0.8"
        fill="#1b0c25"
        fillOpacity="0.35"
      />
      <rect
        x="498"
        y="84"
        width="6"
        height="14"
        rx="0.8"
        fill="#1b0c25"
        fillOpacity="0.35"
      />
      <rect
        x="552"
        y="84"
        width="6"
        height="14"
        rx="0.8"
        fill="#1b0c25"
        fillOpacity="0.35"
      />

      {/* ====== Main wing (swept back) ====== */}
      <path
        d="M395 110 L335 152 L420 152 L470 110 Z"
        fill="url(#airliner-wing)"
      />
      {/* Wing leading edge (lighter, sun-hit) */}
      <path
        d="M395 110 L470 110"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      {/* Wing trailing edge (darker) */}
      <path
        d="M335 152 L420 152"
        stroke="#1b0c25"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      {/* Flap track fairings (those bumps under A320 wings) */}
      <ellipse cx="368" cy="150" rx="4" ry="2" fill="#1e293b" opacity="0.7" />
      <ellipse cx="392" cy="150" rx="4" ry="2" fill="#1e293b" opacity="0.7" />
      <ellipse cx="412" cy="150" rx="4" ry="2" fill="#1e293b" opacity="0.7" />

      {/* Wing winglet hint at tip */}
      <path
        d="M335 152 L325 146 L329 144"
        fill="url(#airliner-wing)"
        stroke="#1b0c25"
        strokeOpacity="0.2"
        strokeWidth="0.6"
      />

      {/* ====== Engine pod (CFM56 under wing) ====== */}
      {/* Pylon connecting engine to wing */}
      <path
        d="M398 122 L408 122 L406 130 L400 130 Z"
        fill="url(#airliner-wing)"
      />
      {/* Engine nacelle */}
      <ellipse cx="402" cy="138" rx="26" ry="11" fill="url(#airliner-engine)" />
      {/* Bypass fan (front intake) */}
      <ellipse cx="426" cy="138" rx="5" ry="9" fill="#0b1e3b" />
      <ellipse cx="426" cy="138" rx="3.5" ry="6" fill="#1e293b" />
      {/* Fan blade hint */}
      <path
        d="M426 132 L426 144 M422 138 L430 138"
        stroke="#94a3b8"
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />
      {/* Engine highlight (top sun-hit) */}
      <path
        d="M384 132 Q402 128 420 132"
        stroke="#cbd5e1"
        strokeOpacity="0.7"
        strokeWidth="1"
        fill="none"
      />
      {/* Exhaust nozzle */}
      <ellipse cx="378" cy="138" rx="3" ry="5" fill="#0f172a" />

      {/* ====== Far engine (hint, behind fuselage) ====== */}
      <ellipse
        cx="464"
        cy="142"
        rx="20"
        ry="8"
        fill="url(#airliner-engine)"
        opacity="0.55"
      />

      {/* ====== Brand cheatline along fuselage ====== */}
      <path
        d="M285 102 L600 102"
        stroke="#c34f96"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M285 105 L600 105"
        stroke="#80a9fc"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/**
 * Soft cumulus cloud — used as a parallax background layer.
 * Multiple sizes via prop. Softly blurred for atmospheric depth.
 */
export function Cloud({
  size = "md",
  ...props
}: SvgProps & { size?: "sm" | "md" | "lg" }) {
  const dim = { sm: 100, md: 160, lg: 240 }[size];

  return (
    <svg
      viewBox="0 0 240 100"
      width={dim}
      height={dim * (100 / 240)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id={`cloud-fill-${size}`} cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <path
        d="M30 70 Q12 70 12 54 Q12 40 28 38 Q32 22 52 22 Q66 14 84 22 Q98 12 116 20 Q132 12 150 22 Q168 16 184 30 Q210 28 218 50 Q230 56 224 72 Q220 86 200 84 L40 84 Q22 84 30 70 Z"
        fill={`url(#cloud-fill-${size})`}
      />
    </svg>
  );
}
