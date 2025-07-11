import React from "react";

interface SvgPreviewProps {
  svgData?: string;
}

const SvgPreview: React.FC<SvgPreviewProps> = ({ svgData }) => {
  if (!svgData) return null;
  return (
    <div
      style={{ border: "1px solid #ccc", padding: 16, marginTop: 16 }}
      dangerouslySetInnerHTML={{ __html: svgData }}
    />
  );
};

export default SvgPreview; 