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
      width={height * 1.48}
      height={height}
      viewBox="0 0 148 100"
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
        <path d="M 0 100 L 53.8 0 L 99 100 H 86.2 L 53.8 23.2 L 13.8 100 Z" />
        <path d="M 78.5 29 H 106.5 C 131.5 29 148 44.5 148 65 C 148 86.5 131.5 100 106 100 H 99 L 88.8 77.4 C 94.8 78.6 102.6 78.5 110.2 76.8 C 123.8 73.8 132.6 63.5 132.6 51.8 C 132.6 40.9 123.2 36.1 106.2 36.1 H 85.2 Z" />
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

  const logoWidth = size * 4.35;

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <svg
        width={logoWidth}
        height={size}
        viewBox="0 0 435 100"
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
          <path d="M 0 100 L 53.8 0 L 99 100 H 86.2 L 53.8 23.2 L 13.8 100 Z" fill={`url(#${gradId})`} />
          <path d="M 78.5 29 H 106.5 C 131.5 29 148 44.5 148 65 C 148 86.5 131.5 100 106 100 H 99 L 88.8 77.4 C 94.8 78.6 102.6 78.5 110.2 76.8 C 123.8 73.8 132.6 63.5 132.6 51.8 C 132.6 40.9 123.2 36.1 106.2 36.1 H 85.2 Z" fill={`url(#${gradId})`} />
        </g>

        <text
          x="178"
          y="70"
          fill="hsl(var(--logo-wordmark))"
          fontFamily="Inter, Arial, Helvetica, sans-serif"
          fontSize="58"
          fontWeight="900"
          letterSpacing="1.2"
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
