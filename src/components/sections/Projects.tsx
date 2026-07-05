import React, { ButtonHTMLAttributes, useRef } from "react";
import ProjectCard from "../ProjectCard";
import { Project } from "@/types/types";
import { useTranslations } from "next-intl";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { CustomEase, gsap } from "gsap/all";

gsap.registerPlugin(CustomEase);

CustomEase.create("smoothScroll", "M0,0 C0.4,0 0.2,1 1,1");

const ModernArrow = ({ isFlipped = false }: { isFlipped?: boolean }) => {
  return (
    <div className="lang-flip" style={{ display: "flex" }}>
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
          isFlipped
            ? { transform: "scaleX(-1)", zIndex: "20" }
            : { zIndex: "20" }
        }
      >
        <path fill="none" d="m12 6-4 4 4 4"></path>
      </svg>
    </div>
  );
};

type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isFlipped?: boolean;
};
const ControlButton = ({ isFlipped = false, ...props }: ControlButtonProps) => {
  return (
    <button {...props} className="control-btn">
      <div className="control-btn-bg control-btn-bg-default">
        <ModernArrow isFlipped={isFlipped} />
      </div>
      <div className="control-btn-bg control-btn-bg-secondary">
        <ModernArrow isFlipped={isFlipped} />
      </div>
    </button>
  );
};

const Projects = () => {
  const t = useTranslations("projects");
  const { isAr } = useGlobalContext();
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      image: "/caterfy_preview.png",
    },
  ];

  const scrollToProject = (back: boolean = false) => {
    const length = projects.length;
    const container = containerRef.current!;

    for (
      let i = back ? length - 1 : 0;
      back ? i >= 0 : i < length;
      back ? i-- : i++
    ) {
      const el = projectRefs.current[i];
      const width = window.innerWidth;
      const rect = el?.getBoundingClientRect();
      const isInvisible = isAr
        ? back
          ? rect!.right > width
          : rect!.left + 40 < 0
        : back && !isAr
          ? rect!.left + 40 < 0
          : rect!.right > width;

      if (isInvisible) {
        let targetLeft: number;

        if (i === length - 1) {
          targetLeft = isAr
            ? -(container.scrollWidth - container.clientWidth)
            : container.scrollWidth - container.clientWidth;
        } else if (i === 0) {
          targetLeft = 0;
        } else {
          const containerRect = container.getBoundingClientRect();
          targetLeft =
            container.scrollLeft + (rect!.left - containerRect.left) - 24;
        }

        gsap.to(container, {
          scrollLeft: targetLeft,
          duration: 0.9,
          ease: "smoothScroll",
        });
        break;
      }
    }
  };

  return (
    <section id="projects">
      <div>
        <div className="projects-controls-wrapper">
          <div className="projects-controls-title">Things I've built</div>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <ControlButton onClick={() => scrollToProject(true)} />
            <ControlButton onClick={() => scrollToProject()} isFlipped={true} />
          </div>
        </div>
        <div ref={containerRef} className="projects-container">
          {projects.map((project, index) => (
            <div
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              key={project.id}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
