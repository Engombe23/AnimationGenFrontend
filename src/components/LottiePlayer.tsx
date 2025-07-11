import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';

interface LottiePlayerProps {
  lottieJson?: object;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ lottieJson }) => {
  if (!lottieJson) return null;
  return (
    <div style={{ marginTop: 24 }}>
      <Player
        autoplay
        loop
        src={lottieJson}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default LottiePlayer; 