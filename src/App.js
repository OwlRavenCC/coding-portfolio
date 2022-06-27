import React, { useRef, useEffect } from "react";
import "./App.css";
import anime from "animejs";

import logoWhite from "./img/complete-logo-white-Owl-Raven-Web.png";
import projectsData from "./data/projects.json";

import { FaGithub } from "react-icons/fa";

const projects = projectsData.projects;

function App() {
  const textWrapper = useRef(null);

  useEffect(() => {
    textWrapper.current.innerHTML = textWrapper.current.textContent.replace(
      /([^]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: false })
      .add({
        targets: ".line1",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 900,
      })
      .add({
        targets: ".line1",
        translateX: [
          0,
          document.querySelector(".letters").getBoundingClientRect().width + 10,
        ],
        easing: "easeOutExpo",
        duration: 1200,
        delay: 100,
      })
      .add(
        {
          targets: ".letter",
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 600,
          delay: (el, i) => 34 * (i + 1),
        },
        900
      )
      .add({
        targets: "#projects",
        opacity: [0, 1],
        duration: 3000,
      });

    anime.timeline({ loop: true }).add({
      targets: ".line1",
      opacity: [1, 0],
      loop: true,
      duration: 500,
      delay: 2000,
    });
  }, []);

  return (
    <main>
      <header>
        <img className="logo" src={logoWhite} alt="Owl Raven Studios Logo" />
        <h1 className="text-wrapper title branding-heading">
          <span className="coding-line line1"></span>
          <span className="letters" ref={textWrapper}>
            &lt;Coding &nbsp; Portfolio /&gt;
          </span>
        </h1>
      </header>

      <section id="projects">
        {projects.map((project) => {
          return (
            <article key={project.id} className="project">
              <a href={project.url} rel="noreferrer" target="_blank">
                <img src={project.image} alt={project.title} />
              </a>
              <div className="project-content">
                <a href={project.url} rel="noreferrer" target="_blank">
                  <h3 className="project-title">{project.title}</h3>
                </a>
                <a
                  href={project.github}
                  rel="noreferrer"
                  className="github-url"
                >
                  <FaGithub /> &nbsp; Repository Link
                </a>
                <p>{project.desc}</p>{" "}
              </div>

              <cite>
                {project.tags.map((tag, index) => {
                  if (index !== project.tags.length - 1) {
                    return `#${tag} , `;
                  } else {
                    return ` #${tag}`;
                  }
                })}
              </cite>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default App;
