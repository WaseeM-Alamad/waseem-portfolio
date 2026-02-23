import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  const toggleDarkMode = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    if (next === "light") {
        setTheme("light");
      document.documentElement.removeAttribute("data-theme");
    } else {
        setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        setTheme("dark");
        return;
      }
      setTheme("light");
    });
  }, [setTheme]);

  return (
    <div className="top-toggle border-radius-btn" onClick={toggleDarkMode}>
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </div>
  );
};

export default ThemeToggle;
