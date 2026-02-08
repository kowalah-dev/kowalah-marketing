import { Player } from "@remotion/player";
import { SprintProcessAnimation } from "./compositions/SprintProcessAnimation";

type ServicesVideoPlayerProps = {
  className?: string;
};

/**
 * ServicesVideoPlayer
 *
 * Renders the Sprint Process Animation for services hero sections.
 * Replaces static ChatGPT hero images with a dynamic process visualization.
 *
 * Usage in Astro:
 *   <ServicesVideoPlayer client:visible />
 *
 * For above-the-fold heroes, use client:load instead of client:visible.
 */
export const ServicesVideoPlayer: React.FC<ServicesVideoPlayerProps> = ({
  className = "",
}) => {
  const fps = 30;
  // Duration: 16 seconds for the full animation cycle + loop
  const durationInFrames = Math.round(16 * fps);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Player
        component={SprintProcessAnimation}
        compositionWidth={1000}
        compositionHeight={560}
        durationInFrames={durationInFrames}
        fps={fps}
        autoPlay
        loop
        style={{
          width: "100%",
          aspectRatio: "1000 / 560",
        }}
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
};

export default ServicesVideoPlayer;
