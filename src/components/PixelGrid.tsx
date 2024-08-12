import { useGSAP } from "@gsap/react";
import { useState } from "react";
import gsap from "gsap";

export function PixelGrid() {
  function generatePixel(count: number) {
    return Array.from({ length: count }, (_, index) => (
      <span key={index} className="pixelItem"></span>
    ));
  }

  return <div className="pixelGrid">{generatePixel(64)}</div>;
}

export function pixelTransition() {
  const { contextSafe } = useGSAP();

  const [currentPage, setCurrentPage] = useState(0);

  const startTransition = contextSafe((id: number) => {
    gsap.set(".pixelGrid", { display: "grid" });
    gsap.fromTo(
      ".pixelItem",
      { opacity: "0" },
      {
        opacity: "1",
        duration: "0.005",
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          changePage(id);
          endTransition();
        },
      }
    );
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

  const changePage = contextSafe((id: number) => {
    const allPages = document.querySelectorAll("main[data-key]");
    const home = document.querySelector("main[data-key='home']");

    allPages.forEach((page) => {
      const dataKey = page.getAttribute("data-key");

      if (dataKey === id.toString()) {
        gsap.set(home, { display: "none" });
        gsap.set(page, {
          display: "block",
        });
      }
    });
  });

  return { startTransition };
}
