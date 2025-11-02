import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({
  id,
  title,
  ...rest
}: {
  id: string;
  title: string;
  [key: string]: any;
}) => {
  // Try to load highest quality thumbnail
  // maxresdefault (1920x1080) -> sddefault (640x480) -> hqdefault (480x360)
  const poster = `maxresdefault`;

  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-lg w-full"
      playerClass="lty-playbtn"
      id={id}
      title={title}
      poster={poster}
      {...rest}
    />
  );
};

export default Youtube;
