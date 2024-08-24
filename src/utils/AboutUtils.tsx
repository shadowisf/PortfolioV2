export function Views() {
  const bioHeader = document.querySelector(".aboutWrapper .bioHeader");
  const bioContainer = document.querySelector(".aboutWrapper .bio");
  const bioTextContainer = document.querySelector(".aboutWrapper .bio .text");

  const skillsetHeader = document.querySelector(".aboutWrapper .skillset h1");
  const timelineHeader = document.querySelector(".aboutWrapper .timeline h1");

  function mobileView() {
    bioContainer?.prepend(bioHeader ? bioHeader : "");

    skillsetHeader?.classList.add("extra");
    timelineHeader?.classList.add("extra");
  }

  function desktopView() {
    bioTextContainer?.prepend(bioHeader ? bioHeader : "");

    skillsetHeader?.classList.remove("extra");
    timelineHeader?.classList.remove("extra");
  }

  return {
    mobileView,
    desktopView,
  };
}

export function getAboutSkillset() {
  const aboutSkillset = {
    architecture: [
      // 3 for expert
      // 2 for intermediate
      // 1 for beginner
      // 0 for planning to learn
      "2typescript",
      "2react",
      "3html",
      "3css",
      "3bootstrap css",
      "3sass",
      "3git",
      "2firebase",
      "1c-sharp",
      "2java",
      "1python",
      "1microsoft sql server",
      "1windows forms",
      "1django",
      "1flask",
      "3xampp",
      "1php",
      "2javascript",
      "1swing",
    ],
  };

  return aboutSkillset.architecture;
}
