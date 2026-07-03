import React from "react";

interface LogoProps {
  className?: string;
  /** Height in px. Width auto-scales for the full wordmark. */
  size?: number;
  withGlow?: boolean;
  /** "full" = AD monogram + SCALE wordmark · "mark" = just the AD monogram */
  variant?: "full" | "mark";
  /** Show the "CONTINGENCY ACCOUNTS" tagline beneath the wordmark */
  withTagline?: boolean;
}

/**
 * AD SCALE — brand logo.
 * Blue gradient "AD" monogram (stylized A fused with a D bowl) + bold white
 * "SCALE" wordmark. Rendered fully in SVG/CSS so it stays razor-sharp at any
 * size and any DPR. Matches the updated adscalehub identity.
 */
const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  withGlow = true,
  variant = "full",
  withTagline = false,
}) => {
  // Unique gradient id per instance so multiple logos on the page don't clash.
  const gradId = React.useId();

  const Monogram = ({ px }: { px: number }) => (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={
        withGlow
          ? { filter: "drop-shadow(0 0 12px hsl(var(--primary) / 0.45))" }
          : undefined
      }
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5EC7FF" />
          <stop offset="55%" stopColor="#1E8FE6" />
          <stop offset="100%" stopColor="#0A5FBF" />
        </linearGradient>
      </defs>

      {/*
        Stylized "A" whose inner counter is shaped like a "D" — the AD wordmark.
        Outer: slanted left edge (A's left leg) + rounded right edge (D bowl).
        Inner cutout (evenodd): the D-shaped counter.
      */}
      <path
        fill={`url(#${gradId})`}
        fillRule="evenodd"
        d="M 4 96 L 38 4 L 52 4 C 82 4, 96 42, 96 82 L 96 96 Z M 30 78 L 46 34 L 52 34 C 66 34, 76 54, 76 78 Z"
      />
    </svg>
  );


  if (variant === "mark") {
    return (
      <span
        className={`inline-flex items-center ${className}`}
        aria-label="AD SCALE"
        role="img"
      >
        <Monogram px={size} />
      </span>
    );
  }

  const markPx = size;
  const scaleFontPx = size * 0.82;

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <span className="inline-flex items-center gap-2">
        <Monogram px={markPx} />
        <span
          className="text-foreground font-black uppercase leading-none"
          style={{
            fontFamily: "Unbounded, 'Space Grotesk', sans-serif",
            fontSize: scaleFontPx,
            letterSpacing: "0.02em",
          }}
        >
          SCALE
        </span>
      </span>
      {withTagline && (
        <span
          className="text-primary/70 mt-1 uppercase"
          style={{
            fontFamily: "Unbounded, 'Space Grotesk', sans-serif",
            fontSize: Math.max(8, size * 0.26),
            letterSpacing: "0.42em",
          }}
        >
          Contingency Accounts
        </span>
      )}
    </div>
  );
};

export default Logo;
