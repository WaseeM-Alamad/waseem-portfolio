/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@/styles/projectCard.css";
import { ExternalLink } from "lucide-react";
import Github from "./icons/Github";
import { Project } from "@/types/types";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const t = useTranslations("projects");

  const openLink = () => {
    window.open(project.github, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="project-card-wrapper" onClick={openLink}>
      <div className="project-card">
        <div style={{ display: "flex", position: "relative" }}>
          <div className="project-card-media-placeholder" />
          <img className="project-card-media" alt="" src={project.image} />
          <video
            className="project-card-media"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={project.video}
            style={{ zIndex: 2 }}
          />
          <img
            className="project-card-logo"
            src={project.logo}
            alt="project-logo"
          />
        </div>
        <div className="project-card-content">
          <div className="project-card-title">
            <div className="project-card-color" />
            <span>{project.title}</span>
          </div>
          <div className="project-card-desc">{project.desc}</div>
          <div className="project-card-bottom">
            <div style={{ fontSize: ".8rem", marginInlineEnd: "auto" }}>
              {project.date}
            </div>
            <a
              onClick={(e) => e.stopPropagation()}
              href={project.github}
              target="_blank"
              className="project-card-btn proj-github-btn"
            >
              <Github size={17} />
              {!project.link && <span>Github</span>}
            </a>
            {project.link && (
              <a
                onClick={(e) => e.stopPropagation()}
                href={project.link}
                target="_blank"
                className="project-card-btn"
              >
                <ExternalLink size={17} />
                <span>{t("visit")}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
