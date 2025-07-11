"use client"
import React, { useState } from "react";
import SvgUploader from "../components/SvgUploader";
import SvgPreview from "../components/SvgPreview";
import LoadingSpinner from "../components/LoadingSpinner";
import LottiePlayer from "../components/LottiePlayer";
import DownloadButton from "../components/DownloadButton";

const HomePage: React.FC = () => {
  const [svgData, setSvgData] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [lottieJson, setLottieJson] = useState<object | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSvgUpload = async (data: string) => {
    setSvgData(data);
    setLottieJson(undefined);
    setError(undefined);
    setLoading(true);
    try {
      // Send SVG data to the API
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ svg: data }),
      });
      if (!response.ok) throw new Error("Failed to generate animation");
      const result = await response.json();
      setLottieJson(result.lottieJson || result);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>SVG to Lottie Animation Generator</h1>
      <SvgUploader onUpload={handleSvgUpload} />
      <SvgPreview svgData={svgData} />
      {loading && <LoadingSpinner />}
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {lottieJson && (
        <>
          <LottiePlayer lottieJson={lottieJson} />
          <DownloadButton lottieJson={lottieJson} filename="animation.json" />
        </>
      )}
    </main>
  );
};

export default HomePage;