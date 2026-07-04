"use client";

import Dialog from "@/components/Dialog";
import { DialogData } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSmoothScroll } from "./SmoothScrollContext";

interface DialogContextType {
  showDialog: (dialog: DialogData) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const { stopScroll, startScroll } = useSmoothScroll();
  const [dialog, setDialog] = useState<DialogData | null>(null);

  useEffect(() => {
    if (dialog) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [dialog, startScroll, stopScroll]);

  const showDialog = (dialog: DialogData) => {
    closeDialog();
    setTimeout(() => {
      setDialog(dialog);
    }, 100);
  };

  const closeDialog = () => {
    setDialog(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: dialog ? 1 : 0,
          display: dialog ? "block" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 50,
          mass: 1,
        }}
        onClick={closeDialog}
        className="dialog-overlay"
      />
      <AnimatePresence>
        {dialog && <Dialog closeDialog={closeDialog} dialog={dialog} />}
      </AnimatePresence>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used inside a DialogProvider");
  }

  return context;
}
