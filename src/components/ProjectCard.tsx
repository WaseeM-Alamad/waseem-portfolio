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
        <img
          className="project-card-img"
          src="https://picsum.photos/2023/300"
        />
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
            <div className="project-card-btn">
              <Github size={17} />
              {/* <span>Github</span> */}
            </div>
            <div className="project-card-btn">
              <ExternalLink size={17} />
              <span>Visit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
