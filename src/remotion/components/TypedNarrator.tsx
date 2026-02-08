import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TypedNarratorProps {
  text: string;
  startFrame: number;
  /** Frames per character. Lower = faster typing. Default 1.5 */
  framesPerChar?: number;
  style?: React.CSSProperties;
  /** If set, narrator fades out starting at this frame */
  fadeOutFrame?: number;
  fadeOutDuration?: number;
}

/**
 * TypedNarrator — character-by-character text reveal for the video narrator voice.
 * Renders centered italic text that types itself, with a blinking cursor.
 */
export const TypedNarrator: React.FC<TypedNarratorProps> = ({
  text,
  startFrame,
  framesPerChar = 1.5,
  style = {},
  fadeOutFrame,
  fadeOutDuration = 15,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const charsVisible = Math.min(
    Math.floor(localFrame / framesPerChar),
    text.length
  );
  const visibleText = text.slice(0, charsVisible);
  const isTyping = charsVisible < text.length;

  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  // Optional fade out
  const fadeOut =
    fadeOutFrame !== undefined
      ? interpolate(
          frame,
          [fadeOutFrame, fadeOutFrame + fadeOutDuration],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      : 1;

  if (fadeOut <= 0) return null;

  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: 15,
        fontWeight: 500,
        fontStyle: "italic",
        color: "#64748b",
        textAlign: "center",
        opacity: entrance * fadeOut,
        letterSpacing: 0.2,
        lineHeight: 1.5,
        ...style,
      }}
    >
      {visibleText}
      {isTyping && (
        <span
          style={{
            opacity: Math.sin(localFrame * 0.3) > 0 ? 0.6 : 0,
            marginLeft: 1,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
