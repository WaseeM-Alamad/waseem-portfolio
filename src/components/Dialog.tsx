import React from "react";
import "@/styles/dialog.css";
import { motion } from "framer-motion";
import { DialogData } from "@/types/types";
import FillButton from "./tools/FillButton";

const Dialog = ({
  closeDialog,
  dialog,
}: {
  closeDialog: () => void;
  dialog: DialogData;
}) => {
  return (
    <motion.div
      initial={{
        transform: "translate(-50%, -40%) scale(0.92)",
        opacity: 0,
      }}
      animate={{
        transform: "translate(-50%, -40%) scale(1)",
        opacity: 1,
      }}
      exit={{
        transform: "translate(-50%, -40%) scale(0.92)",
        opacity: 0,
      }}
      transition={{
        type: "tween",
        ease: [0.17, 0.67, 0.3, 1.33],
        duration: 0.4,
      }}
      className="dialog"
    >
      <span style={{ fontSize: "1.5rem", color: "var(--color-text-primary)" }}>
        {dialog.title}
      </span>
      <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)" }}>
        {" "}
        {dialog.message}{" "}
      </span>

      <FillButton closeDialog={closeDialog} text="Sounds good :)" />
    </motion.div>
  );
};

export default Dialog;
