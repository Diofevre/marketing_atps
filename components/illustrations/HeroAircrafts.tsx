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
  // Scope gradient ids per-variant so multiple balloons on the same page don't
  // all share a single gradient definition (which would give them the same color).
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
      {/* Envelope */}
      <path
        d="M80 6c-38 0-68 28-68 68 0 30 18 56 42 66l9 12h34l9-12c24-10 42-36 42-66 0-40-30-68-68-68z"
        fill={`url(#${gradId})`}
      />
      {/* Vertical stripes */}
      <path
        d="M80 6v138"
        stroke="#fff"
        strokeOpacity="0.25"
        strokeWidth="1.2"
      />
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
      {/* Highlight */}
      <ellipse
        cx="58"
        cy="52"
        rx="14"
        ry="30"
        fill={`url(#${highlightId})`}
        opacity="0.55"
      />
      {/* Ropes */}
      <path
        d="M56 152l12 40M104 152L92 192M80 154v38"
        stroke="#1b0c25"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Basket */}
      <rect
        x="62"
        y="190"
        width="36"
        height="22"
        rx="3"
        fill="#4a2b14"
      />
      <path
        d="M62 196h36M62 202h36M70 190v22M80 190v22M90 190v22"
        stroke="#2f1a0c"
        strokeOpacity="0.8"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Helicopter(props: SvgProps) {
  return (
    <svg
      viewBox="0 0 260 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="heli-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d37bff" />
          <stop offset="100%" stopColor="#7a3fbf" />
        </linearGradient>
      </defs>
      {/* Tail boom */}
      <path
        d="M108 60h108c4 0 6 2 6 6v4c0 4-2 6-6 6h-22l-12 8h-12l-10-6H108z"
        fill="url(#heli-body)"
      />
      {/* Main body */}
      <ellipse cx="78" cy="60" rx="44" ry="22" fill="url(#heli-body)" />
      {/* Canopy glass */}
      <path
        d="M52 54c4-12 24-18 42-16 8 1 12 6 12 14 0 4-4 6-8 6H54c-2 0-3-1-2-4z"
        fill="#c8ecff"
        fillOpacity="0.85"
      />
      <path
        d="M60 48c8-6 22-8 34-6"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1.3"
        fill="none"
      />
      {/* Skids */}
      <path
        d="M38 88h90M46 82v10M116 82v10"
        stroke="#1b0c25"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Main rotor */}
      <rect x="14" y="28" width="140" height="4" rx="2" fill="#1b0c25" />
      <circle cx="84" cy="30" r="4" fill="#1b0c25" />
      <path
        d="M84 30v8"
        stroke="#1b0c25"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Tail rotor */}
      <circle
        cx="228"
        cy="68"
        r="10"
        stroke="#1b0c25"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="2 3"
        fill="none"
      />
      <path
        d="M220 68h16M228 60v16"
        stroke="#1b0c25"
        strokeWidth="1.4"
      />
    </svg>
  );
}
