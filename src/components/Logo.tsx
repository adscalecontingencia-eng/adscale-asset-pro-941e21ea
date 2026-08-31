import React from "react";

interface LogoProps {
  className?: string;
  /** Height in px of the monogram. */
  size?: number;
  withGlow?: boolean;
  /** "full" = AD monogram + SCALE wordmark · "mark" = just the AD monogram */
  variant?: "full" | "mark";
  /** Show the "CONTINGENCY ACCOUNTS" tagline beneath the wordmark */
  withTagline?: boolean;
}

/**
 * AD SCALE — monograma oficial (PNG em alta resolução) + wordmark SCALE.
 */
const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  withGlow = false,
  variant = "full",
  withTagline = false,
}) => {
  const markHeight = Math.round(size * 0.78);

  const Mark = (
    <img
      src="/ad-monogram.png"
      alt=""
      aria-hidden="true"
      width={Math.round(markHeight * (1209 / 864))}
      height={markHeight}
      style={{
        height: markHeight,
        width: "auto",
        display: "block",
        filter: withGlow
          ? "drop-shadow(0 0 10px hsl(var(--logo-blue-mid) / 0.35))"
          : undefined,
      }}
      loading="eager"
      decoding="async"
    />
  );

  if (variant === "mark") {
    return (
      <span
        className={`inline-flex items-center ${className}`}
        aria-label="AD SCALE"
        role="img"
      >
        {Mark}
      </span>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <span className="inline-flex items-end" style={{ gap: size * 0.16 }}>
        {Mark}
        <span
          className="text-foreground"
          style={{
            fontFamily: "Inter, 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
            fontSize: size * 0.72,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            lineHeight: 0.72,
            display: "block",
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
