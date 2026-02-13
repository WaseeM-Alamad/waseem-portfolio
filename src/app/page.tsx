"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const toggleDarkMode = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    if (next === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div>
      <Navbar/>
      <div style={{height: '100dvh'}}>hi </div>
    </div>
  );
}
