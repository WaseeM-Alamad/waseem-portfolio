import React from "react";
import ProjectCard from "../ProjectCard";
import { Project } from "@/types/types";
import { useTranslations } from "next-intl";

const ModernArrow = ({ isFlipped = false }: { isFlipped?: boolean }) => {
  return (
    <svg
      width="28px"
      height="28px"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      data-icon="arrow-left"
      strokeWidth="1.5px"
      stroke="#000"
      style={
        isFlipped ? { transform: "scaleX(-1)", zIndex: "20" } : { zIndex: "20" }
      }
    >
      <path fill="none" d="m12 6-4 4 4 4"></path>
    </svg>
  );
};

const ControlButton = ({isFlipped = false}: {isFlipped?: boolean}) => {
  return (
    <div className="control-btn">
      <div className="control-btn-bg control-btn-bg-default">
        <ModernArrow isFlipped={isFlipped} />
      </div>
      <div className="control-btn-bg control-btn-bg-secondary">
        <ModernArrow isFlipped={isFlipped} />
      </div>
    </div>
  );
};

const Projects = () => {
  const t = useTranslations("projects");

  const projects: Project[] = [
    {
      id: "notopia",
      title: "Notopia",
      desc: t("notopia_desc"),
      date: "Apr 4th, 2024",
      github: "https://github.com/WaseeM-Alamad/notopia",
      link: "https://www.notopia.app/",
      logo: "/notopia_logo.png",
      video:
        "https://res.cloudinary.com/dme5ojqcr/video/upload/v1782376822/notopia_demo_alyxvy.mp4",
      image:
        "https://media.discordapp.net/attachments/1099998106227060789/1522192542664229077/MixCollage-02-Jul-2026-01-46-PM-2553.jpg?ex=6a4793c7&is=6a464247&hm=2c211c20c3f5f2eafdef4227d50837ecbc81959effda506ff019283cd837ae35&=&format=webp&width=953&height=960",
    },

    {
      id: "caterfy",
      title: "Caterfy",
      desc: t("caterfy_desc"),
      date: "Oct 26th, 2025",
      github: "https://github.com/ZeenaQa/Caterfy",
      logo: "/caterfy_logo.png",
      image:
        "https://media.discordapp.net/attachments/1099998106227060789/1522192542664229077/MixCollage-02-Jul-2026-01-46-PM-2553.jpg?ex=6a4793c7&is=6a464247&hm=2c211c20c3f5f2eafdef4227d50837ecbc81959effda506ff019283cd837ae35&=&format=webp&width=953&height=960",
    },
  ];
  return (
    <section id="projects">
      <div>
        <div className="projects-controls-wrapper">
          <div className="projects-controls-title">Things I've built</div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <ControlButton />
            <ControlButton isFlipped={true} />
          </div>
        </div>
        <div className="projects-container">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {/* <ProjectCard /> */}
        </div>
      </div>
    </section>
  );
};

export default Projects;
