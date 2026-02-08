import { interpolate, useCurrentFrame } from "remotion";

type ConnectorLineProps = {
  startFrame: number;
  durationFrames: number;
  isCompleted: boolean;
};

const KOWALAH_PINK = "#fa26a0";
const KOWALAH_PURPLE = "#ae10e3";

export const ConnectorLine: React.FC<ConnectorLineProps> = ({
  startFrame,
  durationFrames,
  isCompleted,
}) => {
  const frame = useCurrentFrame();

  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const progress = interpolate(localFrame, [0, durationFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 50,
        height: 3,
        borderRadius: 2,
        background: "#e2e8f0",
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "flex-start",
        marginTop: 27, // Align with center of step circle (56/2)
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: isCompleted
            ? `linear-gradient(90deg, ${KOWALAH_PURPLE}, ${KOWALAH_PINK})`
            : `linear-gradient(90deg, ${KOWALAH_PINK}, ${KOWALAH_PURPLE})`,
          borderRadius: 2,
        }}
      />
    </div>
  );
};
