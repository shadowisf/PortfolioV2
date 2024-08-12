import { useGSAP } from "@gsap/react";
import { useState } from "react";
import gsap from "gsap";

export function pixelTransition() {
  const { contextSafe } = useGSAP();

  const [currentPage, setCurrentPage] = useState("");

  const startTransition = contextSafe((targetPage: string, delay: number) => {
    if (targetPage === currentPage) {
      return;
    } else {
      setTimeout(() => {
        gsap.set(".pixelGrid", { display: "grid" });
        gsap.fromTo(
          ".pixelItem",
          { opacity: "0" },
          {
            opacity: "1",
            duration: "0.005",
            stagger: { amount: 0.5, from: "random" },
            onComplete: () => {
              changePage(targetPage);
              endTransition();
            },
          }
        );
      }, delay);
    }
  });

  const endTransition = contextSafe(() => {
    setTimeout(() => {
      gsap.to(".pixelItem", {
        opacity: "0",
        duration: "0.005",
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          gsap.set(".pixelGrid", { display: "none" });
        },
      });
    }, 250);
  });

  function changePage(targetID: string) {
    setCurrentPage(targetID);

    const containerElements = document.querySelectorAll("main[id]");

    gsap.to(window, { scrollTo: { y: 0, x: 0 }, duration: "0.1" });

    containerElements?.forEach((element) => {
      const id = element.getAttribute("id");

      if (id === targetID) {
        gsap.set(element, { display: "block" });
      } else if (id !== targetID) {
        gsap.set(element, { display: "none" });
      }
    });
  }

  return { startTransition, changePage };
}
