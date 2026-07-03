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
 * Filled blue gradient "AD" monogram + bold white "SCALE" wordmark. Rendered
 * as SVG so the mark stays sharp and avoids the low-size stroke distortion.
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

  const Monogram = ({ height }: { height: number }) => (
    <svg
      width={height * 1.52}
      height={height}
      viewBox="0 0 152 100"
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
        <linearGradient id={gradId} x1="0.35" y1="0" x2="0.72" y2="1">
          <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
          <stop offset="52%" stopColor="hsl(var(--logo-blue-mid))" />
          <stop offset="100%" stopColor="hsl(var(--logo-blue-end))" />
        </linearGradient>
      </defs>

      <g fill={`url(#${gradId})`}>
        <path d="M 0 100 L 54 0 L 100 100 H 86 L 54 23 L 14 100 Z" />
        <path d="M 77 29 H 107 C 134 29 152 45.5 152 65 C 152 87.5 134 100 106 100 H 100 L 89 77.5 C 95 79 103 78.8 111 77 C 126 73.5 136 64 136 52 C 136 41 125 36.5 107 36.5 H 86 Z" />
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
        <Monogram height={size} />
      </span>
    );
  }

  const logoWidth = size * 4.23;

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <svg
        width={logoWidth}
        height={size}
        viewBox="0 0 423 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id={gradId} x1="0.35" y1="0" x2="0.72" y2="1">
            <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
            <stop offset="52%" stopColor="hsl(var(--logo-blue-mid))" />
            <stop offset="100%" stopColor="hsl(var(--logo-blue-end))" />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(var(--primary))" floodOpacity={withGlow ? 0.45 : 0} />
          </filter>
        </defs>

        <g filter={`url(#${gradId}-glow)`}>
          <path d="M 0 100 L 54 0 L 100 100 H 86 L 54 23 L 14 100 Z" fill={`url(#${gradId})`} />
          <path d="M 77 29 H 107 C 134 29 152 45.5 152 65 C 152 87.5 134 100 106 100 H 100 L 89 77.5 C 95 79 103 78.8 111 77 C 126 73.5 136 64 136 52 C 136 41 125 36.5 107 36.5 H 86 Z" fill={`url(#${gradId})`} />
        </g>

        <text
          x="169"
          y="70"
          fill="hsl(var(--logo-wordmark))"
          fontFamily="Inter, Arial, Helvetica, sans-serif"
          fontSize="59"
          fontWeight="900"
          letterSpacing="0.6"
        >
          SCALE
        </text>
      </svg>
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
