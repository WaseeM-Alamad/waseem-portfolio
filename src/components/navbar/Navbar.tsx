"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import "@/styles/navbar.css";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../tools/LocaleSwitcher";
import ThemeToggle from "../tools/ThemeToggle";
import { projects, sections } from "@/utils/sectionsData";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";
import { useGlobalContext } from "@/contexts/GlobalContext";
import NavMenuBtn from "./NavMenuBtn";

const Navbar = ({ currentSection }: { currentSection: string }) => {
  const { isMobileView, isSplashPlaying } = useGlobalContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("sidebar");
  const t2 = useTranslations("home");

  const { scrollYProgress } = useScroll();
  const { scrollTo, startScroll, stopScroll } = useSmoothScroll();

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollIntoView = (id: string) => {
    if (id === "home") {
      scrollTo(0);
      return;
    }
    scrollTo(`#${id}`);
  };

  const capitalizeInitial = (string: string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;
      const willClose = width > 740;
      if (!willClose) return;
      setMenuOpen(false);
    };

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [setMenuOpen]);

  useLayoutEffect(() => {
    if (menuOpen) {
      stopScroll();
      document.documentElement.setAttribute("mobile-menu-open", "1");
    } else {
      startScroll();
      document.documentElement.setAttribute("mobile-menu-open", "0");
    }
  }, [menuOpen, startScroll, stopScroll]);

  if (isSplashPlaying) return;

  return (
    <>
      <div className="overlay" onClick={() => setMenuOpen(false)} />
      <AnimatePresence>
        {isMobileView && (
          <motion.div
            initial={{ y: -200 }}
            animate={{
              y: 0,
            }}
            exit={{ y: -200 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 50,
              mass: 0.3,
            }}
            className="nav-wrapper"
          >
            <nav>
              <div className="logo" onClick={() => scrollIntoView("home")}>
                {t2("WaseeM")}
              </div>
              <div className="top-navigation">
                {sections.map(({ id }) => (
                  <div
                    style={{ height: "fit-content" }}
                    key={id}
                    className={currentSection === id ? "selected" : ""}
                  >
                    <button
                      aria-label={t(id)}
                      className="top-btn"
                      onClick={() => scrollIntoView(id)}
                    />
                  </div>
                ))}
                <motion.div style={{ width: width }} className="slider" />
              </div>
              <div className="top-settings">
                <LocaleSwitcher inSidebar={false} />
                <ThemeToggle inSidebar={false} />
                <NavMenuBtn isOpen={menuOpen} setIsOpen={setMenuOpen} />
              </div>

              <div className="nav-menu">
                <div className="nav-menu-inner">
                  {sections.map(({ id }, index) => {
                    return (
                      <div
                        key={id}
                        className="nav-menu-btn"
                        onClick={() => {
                          startScroll();
                          requestAnimationFrame(() => {
                            setMenuOpen(false);
                            scrollTo(`#${id}`);
                          });
                        }}
                        style={{ "--index": index } as React.CSSProperties}
                      >
                        {t(id)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
