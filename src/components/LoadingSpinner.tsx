import React from "react";

const spinnerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

const circleStyle: React.CSSProperties = {
  border: "8px solid #f3f3f3",
  borderTop: "8px solid #3498db",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  animation: "spin 1s linear infinite",
};

const styleSheet = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

const LoadingSpinner: React.FC = () => (
  <div style={spinnerStyle}>
    <style>{styleSheet}</style>
    <div style={circleStyle}></div>
  </div>
);

export default LoadingSpinner; 