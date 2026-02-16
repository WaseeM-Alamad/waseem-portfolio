"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Notopia from "./projects/Notopia";
import Caterfy from "./projects/Caterfy";
import useDetectSection from "@/hooks/useDetectSection";

const Main = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>("home");
  const mainRef = useRef<HTMLElement | null>(null);
  

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  useDetectSection({ setCurrentSection });

  if (!isMounted) return;

  return (
    <>
      <Sidebar currentSection={currentSection} />
      <main ref={mainRef}>
        <Home />
        <About />
        <Skills />
        <Contact />
        <Notopia />
        <Caterfy />
        {/* <AnimatedPath sectionRef={mainRef} /> */}
      </main>
    </>
  );
};

export default Main;
