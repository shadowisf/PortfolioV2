export function Views() {
  const bioHeader = document.querySelector(".aboutWrapper .bio .header");
  const bioContainer = document.querySelector(".aboutWrapper .bio");
  const bioTextContainer = document.querySelector(
    ".aboutWrapper .bio .content"
  );

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

const aboutSkillset: { [key: string]: number } = {
  // 3 for expert
  // 2 for intermediate
  // 1 for beginner
  // 0 for planning to learn
  typescript: 2,
  react: 2,
  html: 3,
  css: 3,
  "bootstrap css": 3,
  sass: 3,
  git: 3,
  firebase: 2,
  "c-sharp": 1,
  java: 2,
  python: 1,
  "transact-sql": 1,
  django: 1,
  flask: 1,
  mariadb: 3,
  mysql: 3,
  php: 1,
  javascript: 2,
};

export function getAllSkills() {
  return Object.keys(aboutSkillset);
}

export function getSkillLevel(skill: string) {
  return aboutSkillset[skill];
}
