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
 * AD SCALE — monograma A/D fundido (chevron "A" cujo apoio direito é a haste
 * do "D"), gradiente ciano→azul na horizontal, wordmark SCALE pesada.
 */

const MONO_VB_W = 470;
const MONO_VB_H = 430;
const FULL_VB_W = 1560;
const FULL_VB_H = MONO_VB_H;

/** Chevron "A": ápice no topo, pernas espessas, pés retos. */
const PATH_A =
  "M150 14 L196 14 L330 416 L252 416 L173 168 L94 416 L16 416 Z";

/** "D": haste inclinada acompanhando a perna direita do A + bojo arredondado. */
const PATH_D =
  "M196 84 C352 84 442 146 442 250 C442 352 372 416 268 416 L196 416 L196 340 L262 340 C325 340 362 306 362 250 C362 192 313 160 236 160 L222 160 Z";

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
  const gradDId = `adscale-gradd-${uid}`;
  const glowId = `adscale-glow-${uid}`;

  const Defs = () => (
    <defs>
      <linearGradient
        id={gradId}
        gradientUnits="userSpaceOnUse"
        x1="16"
        y1="416"
        x2="330"
        y2="14"
      >
        <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
        <stop offset="100%" stopColor="hsl(var(--logo-blue-mid))" />
      </linearGradient>
      <linearGradient
        id={gradDId}
        gradientUnits="userSpaceOnUse"
        x1="196"
        y1="84"
        x2="442"
        y2="416"
      >
        <stop offset="0%" stopColor="hsl(var(--logo-blue-mid))" />
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
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d={PATH_A} fill={`url(#${gradId})`} />
      <path d={PATH_D} fill={`url(#${gradDId})`} />
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
