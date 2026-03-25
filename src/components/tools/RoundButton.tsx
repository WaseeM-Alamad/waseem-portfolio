import React, { ReactNode } from "react";
import "@/styles/roundButton.css";

const RoundButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="round-btn">
      <div style={{ display: "flex", zIndex: '2' }}>{children}</div>
    </div>
  );
};

export default RoundButton;
