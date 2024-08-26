import gsap from "gsap";
import { Flip } from "gsap/all";

gsap.registerPlugin(Flip);

export default function Test() {
  return <main className="test"></main>;
}
