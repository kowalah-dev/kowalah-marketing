import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type ProcessStepProps = {
  title: string;
  subtitle: string;
  icon: "sprint" | "platform" | "training" | "ongoing";
  stepNumber: number;
  startFrame: number;
  isActive: boolean;
  isCompleted: boolean;
};

const KOWALAH_PINK = "#fa26a0";
const KOWALAH_PURPLE = "#ae10e3";

const iconPaths: Record<string, React.ReactNode> = {
  sprint: (
    <path
      d="M13 10V3L4 14h7v7l9-11h-7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  platform: (
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 9h18M9 21V9" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  training: (
    <>
      <path
        d="M12 14l9-5-9-5-9 5 9 5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14v7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 9v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  ongoing: (
    <path
      d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
};

export const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  subtitle,
  icon,
  stepNumber,
  startFrame,
  isActive,
  isCompleted,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  // Glow pulse when active
  const glowIntensity = isActive
    ? interpolate(
        Math.sin((localFrame / fps) * Math.PI * 2),
        [-1, 1],
        [0.15, 0.35],
      )
    : 0;

  const borderColor = isActive
    ? KOWALAH_PINK
    : isCompleted
      ? KOWALAH_PURPLE
      : "#e2e8f0";
  const bgColor = isActive ? "#fff5fb" : isCompleted ? "#faf5ff" : "#ffffff";
  const numberBg =
    isActive || isCompleted
      ? `linear-gradient(135deg, ${KOWALAH_PINK}, ${KOWALAH_PURPLE})`
      : "#e2e8f0";
  const numberColor = isActive || isCompleted ? "#ffffff" : "#94a3b8";

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: 190,
        flexShrink: 0,
      }}
    >
      {/* Step circle with icon */}
      <div
        style={{
          position: "relative",
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: numberBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isActive
            ? `0 0 ${20 + glowIntensity * 30}px rgba(250, 38, 160, ${glowIntensity})`
            : "0 2px 8px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ color: numberColor }}
        >
          {isCompleted && !isActive ? (
            <polyline
              points="20 6 9 17 4 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            iconPaths[icon]
          )}
        </svg>
      </div>

      {/* Step number badge */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isActive ? KOWALAH_PINK : isCompleted ? KOWALAH_PURPLE : "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        Phase {stepNumber}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: isActive ? "#0f172a" : isCompleted ? "#334155" : "#64748b",
          textAlign: "center",
          lineHeight: 1.3,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 11,
          color: isActive ? "#475569" : "#94a3b8",
          textAlign: "center",
          lineHeight: 1.4,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          maxWidth: 170,
        }}
      >
        {subtitle}
      </div>

      {/* Active indicator bar */}
      <div
        style={{
          width: 40,
          height: 3,
          borderRadius: 2,
          background:
            isActive
              ? `linear-gradient(90deg, ${KOWALAH_PINK}, ${KOWALAH_PURPLE})`
              : isCompleted
                ? KOWALAH_PURPLE
                : "transparent",
          opacity: isActive || isCompleted ? 1 : 0,
          marginTop: 2,
        }}
      />
    </div>
  );
};
