"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Main from "./Main";
import Notopia from "./Notopia";
import useDetectSection from "@/hooks/useDetectSection";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import SplashScreen from "./SplashScreen";

const pages = { Main, Notopia } as const;
type PageKey = keyof typeof pages;

const getPage = (pathname: string): PageKey => {
  const route = pathname.replace(/^\/|\/$/g, "").toLowerCase();
  return route === "notopia" ? "Notopia" : "Main";
};

const variants = {
  initial: { y: "100%", scale: 0.98, transformOrigin: "50% 50svh" },
  animate: { y: 0, scale: 1 },
  exit: { opacity: 0.2, scale: 0.9, transformOrigin: "50% 75rem" },
};

function lockScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
  window.scrollTo(0, 0);
}

export default function TransitionWrapper() {
  const [currentSection, setCurrentSection] = useState("home");
  useDetectSection({ setCurrentSection });

  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageKey>(() =>
    getPage(pathname),
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentPageRef = useRef(currentPage);

  useEffect(() => {
    const next = getPage(pathname);
    if (next === currentPageRef.current) return;
    currentPageRef.current = next;

    lockScroll();

    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setCurrentPage(next);
    });
  }, [pathname]);

  const handleEnterComplete = () => {
    unlockScroll();
    setIsTransitioning(false);
    window.dispatchEvent(new CustomEvent("page-transition-complete"));
  };

  const Page = pages[currentPage];

  return (
    <>
      <SplashScreen />
      <Sidebar currentSection={currentSection} />
      <Navbar currentSection={currentSection} />
      <AnimatePresence mode="sync">
        <motion.div
          key={currentPage}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            ...(isTransitioning
              ? { position: "fixed", inset: 0 }
              : { minHeight: "100dvh" }),
          }}
          transition={{ duration: 0.75, ease: [0.5, 0, 0, 1] }}
          onAnimationComplete={(def) => {
            if (def === "animate") handleEnterComplete();
          }}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
