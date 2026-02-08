import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type ThinkingIndicatorProps = {
  startFrame: number;
  durationFrames: number;
};

const CLAUDE_PEACH = "#DE7356";

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  startFrame,
  durationFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame >= durationFrames) return null;

  const opacity = interpolate(localFrame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {/* Claude avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: CLAUDE_PEACH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        C
      </div>

      {/* Dots */}
      <div style={{ paddingTop: 4 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 4,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          Claude
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center", height: 24 }}>
          {[0, 1, 2].map((i) => {
            const dotCycle = (localFrame + i * 6) % 24;
            const y = interpolate(dotCycle, [0, 6, 12, 24], [-3, 0, -3, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#b1ada1",
                  transform: `translateY(${y}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
