import { interpolate, useCurrentFrame } from "remotion";

// --- DrawPath: Animate an SVG path being "drawn" via stroke-dashoffset ---

interface DrawPathProps {
  d: string;
  startFrame: number;
  durationFrames: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
  strokeDasharray?: string;
}

export const DrawPath: React.FC<DrawPathProps> = ({
  d,
  startFrame,
  durationFrames,
  stroke = "#94a3b8",
  strokeWidth = 1.5,
  fill = "none",
  opacity = 1,
  strokeDasharray,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (progress <= 0) return null;

  return (
    <path
      d={d}
      pathLength={1}
      strokeDasharray={strokeDasharray || "1"}
      strokeDashoffset={strokeDasharray ? 0 : 1 - progress}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity * (strokeDasharray ? progress : 1)}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

// --- DrawCircle: Animate a circle being drawn ---

interface DrawCircleProps {
  cx: number;
  cy: number;
  r: number;
  startFrame: number;
  durationFrames: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
}

export const DrawCircle: React.FC<DrawCircleProps> = ({
  cx,
  cy,
  r,
  startFrame,
  durationFrames,
  stroke = "#94a3b8",
  strokeWidth = 1.5,
  fill = "none",
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (progress <= 0) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={progress >= 1 ? fill : "none"}
      opacity={opacity}
    />
  );
};

// --- DrawRect: Animate a rectangle being drawn ---

interface DrawRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  startFrame: number;
  durationFrames: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
}

export const DrawRect: React.FC<DrawRectProps> = ({
  x,
  y,
  width,
  height,
  rx = 4,
  startFrame,
  durationFrames,
  stroke = "#94a3b8",
  strokeWidth = 1.5,
  fill = "none",
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (progress <= 0) return null;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={progress >= 1 ? fill : "none"}
      opacity={opacity}
    />
  );
};

// --- FadeElement: Wrap any content with frame-based opacity ---

interface FadeElementProps {
  startFrame: number;
  durationFrames: number;
  fadeIn?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FadeElement: React.FC<FadeElementProps> = ({
  startFrame,
  durationFrames,
  fadeIn = true,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    fadeIn ? [0, 1] : [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (fadeIn && opacity <= 0) return null;
  if (!fadeIn && opacity <= 0) return null;

  return <g opacity={opacity} style={style}>{children}</g>;
};
