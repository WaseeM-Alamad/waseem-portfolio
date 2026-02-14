"use client";

import React from "react";
import "@/styles/navbar.css";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const t = useTranslations("nav");

  const sections = [
    {
      title: t("home"),
      onClick: () => {},
    },
    {
      title: t("about"),
      onClick: () => {},
    },
    {
      title: t("skills"),
      onClick: () => {},
    },
    {
      title: t("projects"),
      onClick: () => {},
    },
    {
      title: t("contact"),
      onClick: () => {},
    },
  ];

  return (
    <div className="nav-wrapper">
      <nav>
        <div className="logo">WaseeM</div>
        <div className="top-navigation">
          {sections.map(({ title, onClick }) => (
            <button key={title} onClick={onClick}>
              {title}
            </button>
          ))}
          <div className="top-settings">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
