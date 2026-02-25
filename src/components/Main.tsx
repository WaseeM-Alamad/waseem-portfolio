"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Notopia from "./projects/Notopia";
import Caterfy from "./projects/Caterfy";
import useDetectSection from "@/hooks/useDetectSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Plant from "./icons/Plant";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const mainRef = useRef<HTMLElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  // useDetectSection({ setCurrentSection });

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      // all panels except the last one get the pin + scale-out treatment
      panels.slice(0, -1).forEach((panel) => {
        const inner = panel.querySelector<HTMLElement>(".panel-inner");
        if (!inner) return;

        const panelHeight = inner.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;

        const fakeScrollRatio =
          difference > 0 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio) {
          panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
        }

        if (shadowRef.current) {
          gsap.fromTo(
            shadowRef.current,
            { opacity: 0 },
            {
              opacity: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: ".panel-home",
                start: "top top",
                end: "150% top",
                scrub: true,
              },
            },
          );
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "bottom bottom",
            end: () =>
              fakeScrollRatio ? `+=${inner.offsetHeight}` : "180% top",
            pinSpacing: false,
            pin: true,
            scrub: true,
          },
        });

        if (fakeScrollRatio) {
          tl.to(inner, {
            yPercent: -100,
            y: window.innerHeight,
            duration: 1 / (1 - fakeScrollRatio) - 1,
            ease: "none",
          });
        }

        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.8, opacity: 0.5, duration: 0.9 },
        ).to(panel, { opacity: 0.3, duration: 0.1 });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [mainRef]);

  return (
    <div>
      <Sidebar currentSection={currentSection} />

      <main ref={mainRef}>
        <div
          ref={shadowRef}
          style={{
            top: "0",
            opacity: 0,
            pointerEvents: "none",
            zIndex: "1",
            position: "fixed",
            height: "100%",
            width: "100%",
            background: "rgba(0,0,0,1)",
          }}
        />
        {/* Panel 1 — Home */}
        <div className="panel panel-home">
          <div className="panel-inner">
            <Home />
          </div>
        </div>

        {/* Panel 2 — Everything else (last panel, never gets pinned/scaled) */}
        <div className="panel panel-content" style={{ marginTop: "-12vh" }}>
          <Plant />
          <motion.img
            initial={{ opacity: 0, transform: "translate(0%, -100%)" }}
            animate={{ opacity: 1, transform: "translate(-10%, -100%)" }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 300,
              damping: 40,
              mass: 1,
            }}
            style={{
              position: "absolute",
              top: 0,
              insetInlineEnd: "0",
              // marginInlineEnd: "17rem",
              zIndex: 10,
              pointerEvents: "none",
            }}
            width={500}
            src="/couch.png"
          />
          <div className="panel-inner">
            <About />
            <Skills />
            <Contact />
            <Notopia />
            <Caterfy />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
