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
 * AD SCALE — brand logo rebuilt as filled vector geometry.
 * The monogram follows the reference: sharp triangular A, flat feet, angular
 * D entry cuts, rounded D bowl, vertical cyan→blue gradient, no stroked paths.
 */

const MONO_VB_W = 590;
const MONO_VB_H = 430;
const FULL_VB_W = 1648;
const FULL_VB_H = MONO_VB_H;

const PATH_A = "M0 430 L260 0 L492 430 L398 430 L260 100 L120 430 Z";
const PATH_D =
  "M356 128 H470 C541 128 589 189 589 282 C589 370 541 430 470 430 H392 L356 352 H467 C500 352 522 326 522 282 C522 238 500 205 467 205 H386 Z";

const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  withGlow = true,
  variant = "full",
  withTagline = false,
}) => {
  // Unique ids per instance so multiple logos on the page never clash.
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `adscale-grad-${uid}`;
  const glowId = `adscale-glow-${uid}`;

  const Defs = () => (
    <defs>
      <linearGradient
        id={gradId}
        gradientUnits="userSpaceOnUse"
        x1="260"
        y1="0"
        x2="260"
        y2="430"
      >
        <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
        <stop offset="48%" stopColor="hsl(var(--logo-blue-mid))" />
        <stop offset="100%" stopColor="hsl(var(--logo-blue-end))" />
      </linearGradient>
      {withGlow && (
        <filter
          id={glowId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.4"
            floodColor="hsl(var(--logo-blue-mid))"
            floodOpacity="0.28"
          />
        </filter>
      )}
    </defs>
  );

  const Monogram = () => (
    <g
      filter={withGlow ? `url(#${glowId})` : undefined}
      fill={`url(#${gradId})`}
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d={PATH_A} />
      <path d={PATH_D} />
    </g>
  );

  if (variant === "mark") {
    const width = Math.round(size * (MONO_VB_W / MONO_VB_H) * 1000) / 1000;
    return (
      <span
        className={`inline-flex items-center ${className}`}
        aria-label="AD SCALE"
        role="img"
      >
        <svg
          width={width}
          height={size}
          viewBox={`0 0 ${MONO_VB_W} ${MONO_VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          shapeRendering="geometricPrecision"
          style={{ display: "block", overflow: "visible" }}
        >
          <Defs />
          <Monogram />
        </svg>
      </span>
    );
  }

  const WORDMARK_X = 684;
  const width = Math.round(size * (FULL_VB_W / FULL_VB_H) * 1000) / 1000;

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <svg
        width={width}
        height={size}
        viewBox={`0 0 ${FULL_VB_W} ${FULL_VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        style={{ display: "block", overflow: "visible" }}
      >
        <Defs />
        <Monogram />
        <text
          x={WORDMARK_X}
          y="356"
          fill="hsl(var(--logo-wordmark))"
          fontFamily="'Space Grotesk', Inter, 'Helvetica Neue', Arial, sans-serif"
          fontSize="296"
          fontWeight="700"
          letterSpacing="0"
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
