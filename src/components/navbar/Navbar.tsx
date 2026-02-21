"use client";

import React from "react";
import "@/styles/navbar.css";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../tools/LocaleSwitcher";
import ThemeToggle from "../tools/ThemeToggle";
import { projects, sections } from "@/utils/sectionsData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSmoothScroll } from "@/contexts/SmoothScrollContext";

const Navbar = ({ currentSection }: { currentSection: string }) => {
  const t = useTranslations("sidebar");

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
    <div className="nav-wrapper">
      <nav>
        <div className="logo" onClick={() => scrollIntoView("home")}>
          WaseeM
        </div>
        <div className="top-navigation">
          {sections.map(({ id, Icon }) => (
            <div key={id} className={currentSection === id ? "selected" : ""}>
              <button
                aria-label={t(id)}
                className="top-btn"
                onClick={() => scrollIntoView(id)}
              />
            </div>
          ))}
          {projects.map(({ id }) => (
            <div key={id} className={currentSection === id ? "selected" : ""}>
              <button
                aria-label={capitalizeInitial(id)}
                className="top-btn"
                onClick={() => scrollIntoView(id)}
              />
            </div>
          ))}
          <motion.div style={{ width: width }} className="slider" />
        </div>
        <div className="top-settings">
          <div className="top-util">
            <LocaleSwitcher />
          </div>
          <div className="top-util">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
