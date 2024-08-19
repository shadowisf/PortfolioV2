import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Email, LinkedIn, Github, Instagram } from "../components/Icon";
import { LinkWithIconOnly } from "../components/Link";
import { Fragment } from "react/jsx-runtime";

export default function Test() {
  useGSAP(() => {
    gsap.set(".box", { x: "-200" });
    gsap.to(".box", { x: "100", stagger: 0.1, duration: "3" });
  });

  return (
    <Fragment>
      <h1></h1>
      
      <div className="test noCursor">
        <LinkWithIconOnly
          img={<Email width="32" />}
          href="mailto:les.ranalan@gmail.com"
        />

        <LinkWithIconOnly
          img={<LinkedIn width="32" />}
          href="https://www.linkedin.com/in/les-paul-ranalan/"
        />

        <LinkWithIconOnly
          img={<Github width="32" />}
          href="https://github.com/shadowisf"
        />

        <LinkWithIconOnly
          img={<Instagram width="32" />}
          href="https://www.instagram.com/les.rx/"
        />
      </div>
    </Fragment>
  );
}
