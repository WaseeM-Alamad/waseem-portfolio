"use client";
import React, { useState } from "react";
import "@/styles/sidebar.css";
import { useTranslations } from "next-intl";
import { Contact2, Home, Info, LucideGavel } from "lucide-react";

const Sidebar = () => {
  const t = useTranslations("nav");
  const [selectedSection, setSelectedSection] = useState("home");

  const sections = [
    {
      id: "home",
      title: t("home"),
      Icon: Home,
    },
    {
      id: "about",
      title: t("about"),
      Icon: Info,
    },
    {
      id: "skills",
      title: t("skills"),
      Icon: LucideGavel,
    },
    // {
    //   title: t("projects"),
    //
    // },
    {
      id: "contact",
      title: t("contact"),
      Icon: Contact2,
    },
  ];

  const projects = [
    {
      id: "notopia",
      title: "Notopia",
      Icon: Home,
    },
    {
      id: "caterfy",
      title: "Caterfy",
      Icon: Contact2,
    },
  ];

  return (
    <div className="sidebar-wrapper">
      <aside>
        <div className="logo">waseem</div>
        <div className="side-sections-container">
          <div className="side-label">General</div>
          {sections.map(({ id, title, Icon }) => {
            return (
              <div
                key={title}
                className={selectedSection === id ? "selected" : ""}
              >
                <button onClick={() => setSelectedSection(id)}>
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{title}</span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="side-sections-container">
          <div className="side-label">Projects</div>
          {projects.map(({ id, title, Icon }) => {
            return (
              <div
                key={title}
                className={selectedSection === id ? "selected" : ""}
              >
                <button onClick={() => setSelectedSection(id)}>
                  <Icon size={18} strokeWidth={1.5} />
                  <span>{title}</span>
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
