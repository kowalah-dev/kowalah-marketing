import { interpolate, useCurrentFrame } from "remotion";

type TypingCursorProps = {
  blinkFrames?: number;
  color?: string;
};

export const TypingCursor: React.FC<TypingCursorProps> = ({
  blinkFrames = 16,
  color = "currentColor",
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame % blinkFrames,
    [0, blinkFrames / 2, blinkFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <span style={{ opacity, color, fontWeight: 400, marginLeft: 1 }}>
      {"\u258C"}
    </span>
  );
};
