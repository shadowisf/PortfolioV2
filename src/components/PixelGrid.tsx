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
  const [currentPage, setCurrentPage] = useState(0);

  const { contextSafe } = useGSAP();

  const startTransition = contextSafe((id: number) => {
    if (currentPage === id) {
      console.log("LOL");
    } else {
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

  const changePage = contextSafe((id: number) => {
    const allPages = document.querySelectorAll("main[data-key]");

    allPages.forEach((page) => {
      const dataKey = page.getAttribute("data-key");

      switch (dataKey) {
        case "-1":
          gsap.set(allPages, {
            display: "none",
          });
          gsap.set(page, { display: "flex" });
          setCurrentPage(id);
          break;
        case id.toString():
          gsap.set(allPages, { display: "none" });
          gsap.set(page, { display: "block" });
          setCurrentPage(id);
          break;
        default:
      }
    });
  });

  return { startTransition };
}
