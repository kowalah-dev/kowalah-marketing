import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TypingCursor } from "./TypingCursor";

type ChatBubbleProps = {
  text: string;
  isUser: boolean;
  startFrame: number;
  charFrames?: number;
  showCursor?: boolean;
  avatar?: string;
};

const getTypedLength = (
  localFrame: number,
  textLength: number,
  charFrames: number,
): number => {
  return Math.min(textLength, Math.floor(localFrame / charFrames));
};

// Claude brand colors
const CLAUDE_PEACH = "#DE7356";
const CLAUDE_BG = "#F4F3EE"; // Pampas - Claude's warm off-white

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isUser,
  startFrame,
  charFrames = 2,
  showCursor = true,
  avatar,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  // Entrance: slide up and fade in
  const entrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  const translateY = interpolate(entrance, [0, 1], [20, 0]);

  // Typing progress
  const typedLength = getTypedLength(localFrame, text.length, charFrames);
  const visibleText = text.slice(0, typedLength);
  const isTypingComplete = typedLength >= text.length;

  const avatarBg = isUser ? "#94a3b8" : CLAUDE_PEACH;
  const avatarLabel = avatar || (isUser ? "You" : "C");

  return (
    <div
      style={{
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: avatarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {avatarLabel}
      </div>

      {/* Message content */}
      <div style={{ flex: 1, paddingTop: 4 }}>
        {/* Sender name */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 4,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {isUser ? "You" : "Claude"}
        </div>

        {/* Message text */}
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "#1f2937",
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <span>{visibleText}</span>
          {showCursor && !isTypingComplete && (
            <TypingCursor color="#9ca3af" />
          )}
        </div>
      </div>
    </div>
  );
};
