"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Main from "./Main";
import Notopia from "./Notopia";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import useDetectSection from "@/hooks/useDetectSection";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

const pages = { Main, Notopia } as const;
type PageKey = keyof typeof pages;

const getPage = (pathname: string): PageKey => {
  const route = pathname.replace(/^\/|\/$/g, "").toLowerCase();
  return route === "notopia" ? "Notopia" : "Main";
};

const TransitionWrapper = () => {
  const [currentSection, setCurrentSection] = useState<string>("home");

  useDetectSection({ setCurrentSection });
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageKey>(() =>
    getPage(pathname),
  );

  useEffect(() => {
    setCurrentPage(getPage(pathname));
  }, [pathname]);

  const Page = pages[currentPage];

  return (
    <div style={{ position: "relative" }}>
      <Sidebar currentSection={currentSection} />
      <Navbar currentSection={currentSection} />
      <AnimatePresence mode="sync">
        <motion.div
          key={currentPage}
          style={{
            position: "absolute",
            height: "100dvh",
            inset: "0",
          }}
          // initial={{
          //   opacity: 1,
          //   y: "100%",
          //   scale: 0.95,
          //   transformOrigin: "50% 50svh",
          // }}
          // animate={{ opacity: 1, y: 0, scale: 1 }}
          // exit={{
          //   opacity: 0.3,
          //   y: "10%",
          //   scale: 0.9,
          //   transformOrigin: "50% 281.5px",
          // }}
          // transition={{
          //   duration: 0.75,
          //   ease: [0.5, 0, 0, 1],
          // }}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransitionWrapper;
