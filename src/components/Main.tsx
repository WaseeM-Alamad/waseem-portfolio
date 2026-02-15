"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Notopia from "./projects/Notopia";
import Caterfy from "./projects/Caterfy";
import AnimatedPath from "./tools/AnimatedPath";

const Main = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>("home");
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const onSectionView = (id: string) => {
    setCurrentSection(id);
    if (!["notopia", "caterfy"].includes(id)) {
      document.documentElement.setAttribute("data-section", "default");
      return;
    }
    document.documentElement.setAttribute("data-section", id);
  };

  if (!isMounted) return;

  return (
    <>
      <Sidebar currentSection={currentSection} />
      <main ref={sectionRef}>
        <Home onSectionView={onSectionView} />
        <About onSectionView={onSectionView} />
        <Skills onSectionView={onSectionView} />
        <Contact onSectionView={onSectionView} />
        <Notopia onSectionView={onSectionView} />
        <Caterfy onSectionView={onSectionView} />
        <AnimatedPath sectionRef={sectionRef} />
      </main>
    </>
  );
};

export default Main;
