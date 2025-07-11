import React from "react";

interface DownloadButtonProps {
  lottieJson?: object;
  filename?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ lottieJson, filename = "animation.json" }) => {
  const handleDownload = () => {
    if (!lottieJson) return;
    const blob = new Blob([JSON.stringify(lottieJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!lottieJson) return null;
  return (
    <button onClick={handleDownload} style={{ marginTop: 16 }}>
      Download Lottie JSON
    </button>
  );
};

export default DownloadButton; 