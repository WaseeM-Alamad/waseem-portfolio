import { AnimatePresence, motion } from "framer-motion";
import { memo, useLayoutEffect, useState } from "react";
import "@/styles/splashScreen.css";
import { useGlobalContext } from "@/contexts/GlobalContext";

const SplashScreen = () => {
  const { setIsSplashPlaying } = useGlobalContext();

  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutDuration = 1400;

  useLayoutEffect(() => {
    let startTime = Date.now();
    let remaining = timeoutDuration;

    let timer = setTimeout(finish, remaining);

    function finish() {
      setIsPlaying(false);

      setTimeout(() => {
        setIsSplashPlaying(false);
      }, 150);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        clearTimeout(timer);
        remaining -= Date.now() - startTime;
      } else {
        startTime = Date.now();
        timer = setTimeout(finish, remaining);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setIsPlaying, setIsSplashPlaying]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className="splash-screen"
          style={{ overflow: "hidden" }}
          exit={{ clipPath: "inset(0 0 100%)" }}
          transition={{ duration: 1, ease: [0.5, 0, 0, 1] }}
        >
          <div
            className="content-container"
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 1.5,
                opacity: { duration: 0.5, ease: "easeInOut" },
                ease: [0.55, 0.5, 0.15, 1],
              }}
              style={{
                fontSize: "10.5rem",
                fontWeight: "bold",
                zIndex: "1",
                color: "var(--color-text-primary)",
              }}
            >
              WaseeM
            </motion.div>
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{ position: "absolute" }}
              width="817"
              height="333"
              viewBox="0 0 817 333"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.65, 0.6, 0.15, 1],
                }}
                d="M226.271 33.5083C93.5875 70.5328 -30.467 216.894 70.3359 281.509C185.622 355.406 581.765 168.254 783.5 187.008"
                stroke="var(--color-primary)"
                strokeWidth="60"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(SplashScreen);
