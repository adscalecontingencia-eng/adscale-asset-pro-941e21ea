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
 * The monogram is a single-weight stroked mark: an open triangle "A" whose
 * right leg flows into a curved "D" bowl, drawn with a top→bottom blue
 * gradient (light cyan → deep blue), rounded caps and joins. Rendered as
 * SVG so it stays crisp at every size.
 */
const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  withGlow = true,
  variant = "full",
  withTagline = false,
}) => {
  // Unique gradient id per instance so multiple logos on the page don't clash.
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradId = `logoGrad-${uid}`;
  const glowId = `logoGlow-${uid}`;

  // Monogram intrinsic viewBox: 0 0 130 120
  // A: left-foot (6,116) → apex (55,4) → right-foot (104,116)
  // D bowl: top (74,40) curves right and returns to (99,111) on right leg
  const MONO_W = 130;
  const MONO_H = 120;
  const STROKE = 11;

  const MonoPaths = ({ stroke }: { stroke: string }) => (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Open "A" triangle */}
      <path d="M 6 116 L 55 4 L 104 116" />
      {/* "D" bowl attached to the right leg */}
      <path d="M 74 40 C 118 44, 126 108, 99 111" />
    </g>
  );

  const MonoDefs = () => (
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--logo-blue-start))" />
        <stop offset="55%" stopColor="hsl(var(--logo-blue-mid))" />
        <stop offset="100%" stopColor="hsl(var(--logo-blue-end))" />
      </linearGradient>
      {withGlow && (
        <filter id={glowId} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2.5"
            floodColor="hsl(var(--logo-blue-mid))"
            floodOpacity="0.55"
          />
        </filter>
      )}
    </defs>
  );

  if (variant === "mark") {
    const width = size * (MONO_W / MONO_H);
    return (
      <span
        className={`inline-flex items-center ${className}`}
        aria-label="AD SCALE"
        role="img"
      >
        <svg
          width={width}
          height={size}
          viewBox={`0 0 ${MONO_W} ${MONO_H}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          shapeRendering="geometricPrecision"
        >
          <MonoDefs />
          <g filter={withGlow ? `url(#${glowId})` : undefined}>
            <MonoPaths stroke={`url(#${gradId})`} />
          </g>
        </svg>
      </span>
    );
  }

  // Full lockup: monogram + "SCALE" wordmark
  // Layout width tuned to reference proportions
  const VB_W = 470;
  const VB_H = 120;
  const logoWidth = size * (VB_W / VB_H);

  return (
    <div
      className={`inline-flex flex-col items-start ${className}`}
      aria-label="AD SCALE"
      role="img"
    >
      <svg
        width={logoWidth}
        height={size}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        <MonoDefs />

        <g filter={withGlow ? `url(#${glowId})` : undefined}>
          <MonoPaths stroke={`url(#${gradId})`} />
        </g>

        <text
          x="158"
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
