import { Player } from "@remotion/player";
import { ClaudeChatDemo } from "./compositions/ClaudeChatDemo";

type RemotionPlayerWrapperProps = {
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
};

/**
 * RemotionPlayerWrapper
 *
 * A React component that wraps @remotion/player for use in Astro pages.
 * Use with client:visible directive so it only hydrates when scrolled into view.
 *
 * Usage in Astro:
 *   <RemotionPlayerWrapper client:visible />
 */
export const RemotionPlayerWrapper: React.FC<RemotionPlayerWrapperProps> = ({
  autoPlay = true,
  loop = true,
  className = "",
}) => {
  // Duration calculation: match the composition timeline
  // User typing ~5s + thinking 1.5s + initial response ~3s +
  // skill load ~2.2s + detailed response ~11s + hold 2s = ~25s
  const fps = 30;
  const durationInFrames = Math.round(25 * fps);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Player
        component={ClaudeChatDemo}
        compositionWidth={800}
        compositionHeight={500}
        durationInFrames={durationInFrames}
        fps={fps}
        autoPlay={autoPlay}
        loop={loop}
        style={{
          width: "100%",
          aspectRatio: "800 / 500",
        }}
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
};

export default RemotionPlayerWrapper;
