import React, { ChangeEvent } from "react";

interface SvgUploaderProps {
  onUpload: (svgData: string) => void;
}

const SvgUploader: React.FC<SvgUploaderProps> = ({ onUpload }) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          onUpload(event.target.result);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  return (
    <div>
      <label htmlFor="svg-upload">Upload your SVG file:</label>
      <input
        id="svg-upload"
        type="file"
        accept="image/svg+xml"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SvgUploader; 