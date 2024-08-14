import { useGSAP } from "@gsap/react";
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
    }, 100);
  });

  const changePage = contextSafe((id: number) => {
    const allPages = document.querySelectorAll("main[data-key]");

    allPages.forEach((page) => {
      const dataKey = page.getAttribute("data-key");

      switch (dataKey) {
        case "-1": // home
          gsap.set(allPages, {
            display: "none",
          });
          gsap.set(page, { display: "flex" });
          break;
        case id.toString():
          gsap.set(allPages, { display: "none" });
          gsap.set(page, { display: "block" });
          break;
        default:
      }
    });
  });

  return { startTransition };
}
