import { Player } from "@remotion/player";
import { TwoCompaniesAnimation } from "./compositions/TwoCompaniesAnimation";

type HomepageVideoPlayerProps = {
  className?: string;
};

/**
 * HomepageVideoPlayer
 *
 * Renders the "Two Companies" animation for the homepage Features section.
 * Replaces the Swiper carousel with a narrative Remotion video.
 *
 * Usage in Astro:
 *   <HomepageVideoPlayer client:visible />
 *
 * For above-the-fold placement, use client:load instead.
 */
export const HomepageVideoPlayer: React.FC<HomepageVideoPlayerProps> = ({
  className = "",
}) => {
  const fps = 30;
  // 35 seconds for the full 5-scene narrative cycle
  const durationInFrames = Math.round(35 * fps);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Player
        component={TwoCompaniesAnimation}
        compositionWidth={1200}
        compositionHeight={675}
        durationInFrames={durationInFrames}
        fps={fps}
        autoPlay
        loop
        style={{
          width: "100%",
          aspectRatio: "1200 / 675",
        }}
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
};

export default HomepageVideoPlayer;
