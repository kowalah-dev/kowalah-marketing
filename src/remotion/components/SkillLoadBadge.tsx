import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type SkillLoadBadgeProps = {
  skillName: string;
  startFrame: number;
};

const CLAUDE_PEACH = "#DE7356";

/**
 * An animated badge that slides in to show Claude loading a Skill.
 * Appears as a small card with a loading bar that fills, then a checkmark.
 */
export const SkillLoadBadge: React.FC<SkillLoadBadgeProps> = ({
  skillName,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  // Entrance spring
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const translateY = interpolate(entrance, [0, 1], [16, 0]);

  // Loading bar fills over 1.2 seconds
  const loadDuration = Math.round(1.2 * fps);
  const loadProgress = interpolate(localFrame, [8, 8 + loadDuration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isLoaded = loadProgress >= 100;

  // Checkmark appears with a spring after loading completes
  const checkSpring = isLoaded
    ? spring({
        frame: localFrame - (8 + loadDuration),
        fps,
        config: { damping: 12 },
      })
    : 0;

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        marginLeft: 44,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "10px 16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Skill icon */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `linear-gradient(135deg, ${CLAUDE_PEACH}, #c4563a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isLoaded ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: `scale(${checkSpring})`,
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          )}
        </div>

        {/* Text and loading bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 160 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
              }}
            >
              {skillName}
            </span>
            {isLoaded && (
              <span
                style={{
                  fontSize: 11,
                  color: "#059669",
                  fontWeight: 500,
                  opacity: checkSpring,
                }}
              >
                Loaded
              </span>
            )}
          </div>

          {/* Progress bar */}
          {!isLoaded && (
            <div
              style={{
                height: 3,
                borderRadius: 2,
                background: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${loadProgress}%`,
                  background: CLAUDE_PEACH,
                  borderRadius: 2,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
