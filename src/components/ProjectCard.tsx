/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@/styles/projectCard.css";
import { ExternalLink } from "lucide-react";
import Github from "./icons/Github";

const ProjectCard = () => {
  return (
    <div
      className="project-card-wrapper"
      onClick={() => window.history.pushState(null, "", "notopia")}
    >
      <div className="project-card-bg" />
      <div className="project-card">
        <div style={{ display: "flex", position: "relative" }}>
          <video
            className="project-card-vid"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src="https://res.cloudinary.com/dme5ojqcr/video/upload/v1782376822/notopia_demo_alyxvy.mp4"
          />
          <img
            className="project-card-logo"
            src="/notopia_logo.png"
            alt="project-logo"
          />
        </div>
        <div className="project-card-content">
          <div className="project-card-title">
            <div className="project-card-color" />
            <span>Notopia</span>
          </div>
          <div className="project-card-desc">
            An open-source, full-featured notes app inspired by Google Keep —
            built from scratch with performance, user experience, and design in
            mind.
          </div>
          <div className="project-card-bottom">
            <div style={{ fontSize: ".8rem", marginInlineEnd: "auto" }}>
              Apr 4th, 2024
            </div>
            <a
              onClick={(e) => e.stopPropagation()}
              href="https://github.com/WaseeM-Alamad/notopia"
              target="_blank"
              className="project-card-btn proj-github-btn"
            >
              <Github size={17} />
              {/* <span>Github</span> */}
            </a>
            <a
              onClick={(e) => e.stopPropagation()}
              href="https://www.notopia.app/"
              target="_blank"
              className="project-card-btn"
            >
              <ExternalLink size={17} />
              <span>Visit</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
