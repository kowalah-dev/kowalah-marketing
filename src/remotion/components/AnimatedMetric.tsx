import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type AnimatedMetricProps = {
  value: string;
  label: string;
  startFrame: number;
  index: number;
};

const KOWALAH_PINK = "#fa26a0";
const KOWALAH_PURPLE = "#ae10e3";

export const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  value,
  label,
  startFrame,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stagger entrance by index — 10 frames (~0.33s) between each card.
  // Always render (never return null) so flex centering stays stable.
  const staggerDelay = index * 10;

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 160 },
    delay: staggerDelay,
  });

  const translateY = interpolate(entrance, [0, 1], [20, 0]);
  const scale = interpolate(entrance, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "12px 16px",
        background: "rgba(255,255,255,0.9)",
        borderRadius: 12,
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        minWidth: 120,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${KOWALAH_PINK}, ${KOWALAH_PURPLE})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#64748b",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.3,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {label}
      </div>
    </div>
  );
};
