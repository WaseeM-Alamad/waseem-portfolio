import React from "react";
import ProjectCard from "../ProjectCard";

const Projects = () => {
  return (
    <section id="projects">
      <div>My projects :)</div>
      <div className="projects-container">
        <ProjectCard />
        {/* <ProjectCard /> */}
      </div>
    </section>
  );
};

export default Projects;
