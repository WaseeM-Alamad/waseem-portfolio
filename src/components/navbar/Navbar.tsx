"use client";

import React from "react";
import "@/styles/navbar.css";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../tools/LocaleSwitcher";
import ThemeToggle from "../tools/ThemeToggle";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <nav>
        <div className="logo">WaseeM</div>
        <div className="top-navigation">
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
