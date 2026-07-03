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
      viewBox="0 0 120 100"
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

      <g fill={`url(#${gradId})`} fillRule="evenodd">
        {/* Stylized "A" — chunky left diagonal with inner triangular cutout */}
        <path d="M 4 94 L 34 6 L 52 6 L 60 30 L 46 30 L 43 21 L 30 60 L 54 60 L 54 74 L 25 74 L 18 94 Z" />
        {/* "D" bowl — fused to the A, with rounded outer + inner hole (evenodd) */}
        <path d="M 46 6 L 72 6 C 98 6, 116 26, 116 50 C 116 74, 98 94, 72 94 L 46 94 L 46 78 L 70 78 C 86 78, 96 66, 96 50 C 96 34, 86 22, 70 22 L 46 22 Z" />
      </g>
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
