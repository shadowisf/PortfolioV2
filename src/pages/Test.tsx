import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Test() {
  useGSAP(() => {
    gsap.set(".box", { x: "-200" });
    gsap.to(".box", { x: "100", stagger: 0.1, duration: "3" });
  });

  return (
    <div className="wrapper">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
}
