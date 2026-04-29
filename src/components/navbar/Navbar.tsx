"use client";

import React, { useState } from "react";
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
  const { isMobileView, isAr } = useGlobalContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("sidebar");
  const t2 = useTranslations("home");

  const { scrollYProgress } = useScroll();
  const { scrollTo } = useSmoothScroll();

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -200 }}
        animate={{
          y: !isMobileView ? -200 : 0,
          display: !isMobileView ? "none" : "",
        }}
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
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;
