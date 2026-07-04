import React from "react";

const FillButton = ({
  closeDialog,
  text,
}: {
  closeDialog: () => void;
  text: string;
}) => {
  return (
    <button onClick={closeDialog} className="dialog-close-btn">
      <div className="dialog-btn-txt">{text}</div>
      <span className="dialog-btn-txt">{text}</span>
    </button>
  );
};

export default FillButton;
