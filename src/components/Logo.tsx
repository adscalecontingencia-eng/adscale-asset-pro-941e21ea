import React from "react";

interface LogoProps {
  className?: string;
  /** Height in px. Width auto-scales for the full wordmark. */
  size?: number;
  withGlow?: boolean;
  /** "full" = AD|SCALE wordmark · "mark" = compact AD/SCALE monogram */
  variant?: "full" | "mark";
  /** Show the "CONTINGENCY ACCOUNTS" tagline beneath the wordmark */
  withTagline?: boolean;
}

/**
 * AD SCALE — neon wordmark logo.
 * The brand IS the typography: solid "AD" + outlined "SCALE" joined by a
 * vertical neon divider, with an ascending circuit baseline.
 * Inspired by the AdScale Hub identity, ported to this landing page.
 */
const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  withGlow = true,
  variant = "full",
  withTagline = false,
}) => {
  if (variant === "mark") {
    const w = size;
    return (
      <svg
        width={w}
        height={w}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-primary ${className}`}
        style={withGlow ? { filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.45))" } : undefined}
        aria-label="AD SCALE"
        role="img"
      >
        <rect x="2" y="2" width="60" height="60" rx="14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
        <text x="32" y="30" textAnchor="middle" fontFamily="Unbounded, 'Space Grotesk', sans-serif" fontWeight={800} fontSize="20" letterSpacing="0.04em" fill="currentColor">AD</text>
        <text x="32" y="50" textAnchor="middle" fontFamily="Unbounded, 'Space Grotesk', sans-serif" fontWeight={500} fontSize="11" letterSpacing="0.42em" fill="currentColor" fillOpacity="0.7">SCALE</text>
        <path d="M14 56 L42 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 56 L50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  const h = size;
  const w = size * 5.6;
  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 280 50"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        style={withGlow ? { filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.45))" } : undefined}
        aria-label="AD SCALE"
        role="img"
      >
        <text x="0" y="34" fontFamily="Unbounded, 'Space Grotesk', sans-serif" fontWeight={800} fontSize="32" letterSpacing="-0.01em" fill="currentColor">AD</text>
        <line x1="64" y1="10" x2="64" y2="42" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="64" cy="26" r="2" fill="currentColor" />
        <text x="76" y="34" fontFamily="Unbounded, 'Space Grotesk', sans-serif" fontWeight={400} fontSize="28" letterSpacing="0.18em" fill="none" stroke="currentColor" strokeWidth="0.9">SCALE</text>
        <path d="M0 46 L240 46 L260 30" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="260" cy="30" r="2.5" fill="currentColor" />
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
