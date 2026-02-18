"use client";
import "@/styles/sidebar.css";
import { useLocale, useTranslations } from "next-intl";
import ThemeToggle from "../tools/ThemeToggle";
import LocaleSwitcher from "../tools/LocaleSwitcher";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects, sections } from "@/utils/sectionsData";
import { useSmoothScroll } from "../../contexts/SmoothScrollContext";

const Sidebar = ({ currentSection }: { currentSection: string }) => {
  const locale = useLocale();
  const isEn = locale === "en";
  const t = useTranslations("sidebar");

  const { scrollYProgress } = useScroll();
  const { scrollTo } = useSmoothScroll();

  const height = useTransform(scrollYProgress, [0, 1], ["5%", "100%"]);

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
        initial={{ x: isEn ? -200 : 200 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
          mass: .3,
        }}
        className="sidebar-wrapper"
      >
        <aside>
          <div className="logo">waseem</div>
          <div className="top-settings">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <div id="general-label" className="side-label" style={{ marginTop: "2rem" }}>
            {t("general")}
          </div>
          <div className="side-sections-wrapper">
            <motion.div style={{ height }} className="side-slider" />
            <div className="side-sections-container" style={{ margin: "0" }}>
              {sections.map(({ id, Icon }) => {
                return (
                  <div
                    key={id}
                    className={currentSection === id ? "selected" : ""}
                  >
                    <button onClick={() => scrollIntoView(id)}>
                      <Icon size={18} strokeWidth={1.5} />
                      <span>{t(id)}</span>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="side-sections-container">
              <div id="projects-label" className="side-label">{t("projects")}</div>
              {projects.map(({ id, Icon }) => {
                return (
                  <div
                    key={id}
                    className={currentSection === id ? "selected" : ""}
                  >
                    <button onClick={() => scrollIntoView(id)}>
                      <Icon size={18} strokeWidth={1.5} />
                      <span>{capitalizeInitial(id)}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
