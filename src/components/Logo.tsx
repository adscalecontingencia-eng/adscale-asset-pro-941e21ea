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
 *
 * Single-weight stroked monogram: an open "A" triangle whose right leg flows
 * into a curved "D" bowl, drawn with a top→bottom blue gradient, rounded
 * caps/joins. Pure SVG with a fixed viewBox so it stays pixel-perfect at any
 * size (no double-scaling, no rasterization, no stroke distortion).
 */

// Monogram intrinsic geometry (single source of truth).
const MONO_VB_W = 128;
const MONO_VB_H = 120;
const STROKE_W = 10;

// A: left-foot → apex → right-foot (open triangle, no crossbar).
const PATH_A = "M 8 116 L 56 6 L 104 116";
// D bowl: attaches to the right leg, curves out and returns near the foot.
const PATH_D = "M 74 40 C 116 44, 122 108, 100 112";

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
        x1="56"
        y1="6"
        x2="56"
        y2="116"
      >
        <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
        <stop offset="55%" stopColor="hsl(var(--logo-blue-mid))" />
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
            stdDeviation="1.6"
            floodColor="hsl(var(--logo-blue-mid))"
            floodOpacity="0.5"
          />
        </filter>
      )}
    </defs>
  );

  const Monogram = () => (
    <g
      filter={withGlow ? `url(#${glowId})` : undefined}
      fill="none"
      stroke={`url(#${gradId})`}
      strokeWidth={STROKE_W}
      strokeLinecap="round"
      strokeLinejoin="round"
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

  // Full lockup: monogram (viewBox 0..128) + gap + "SCALE" wordmark.
  const GAP = 30;
  const WORDMARK_X = MONO_VB_W + GAP; // 158
  const VB_W = 470;
  const VB_H = MONO_VB_H;
  const width = Math.round(size * (VB_W / VB_H) * 1000) / 1000;

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <svg
        width={width}
        height={size}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
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
          y="92"
          fill="hsl(var(--logo-wordmark))"
          fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
          fontSize="86"
          fontWeight="800"
          letterSpacing="1"
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
