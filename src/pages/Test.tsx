import gsap from "gsap";
import { Flip } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(Flip);

export default function Test() {
  useEffect(() => {
    const allCheckbox = document.querySelector(
      "#all"
    ) as HTMLInputElement | null;
    const filters = gsap.utils.toArray(".filter") as HTMLInputElement[];
    const items = gsap.utils.toArray(".item") as HTMLElement[];

    function updateFilters() {
      if (!allCheckbox) return;

      const state = Flip.getState(items); // get the current state
      const classes = filters
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => "." + checkbox.id);

      const matches = classes.length
        ? (gsap.utils.toArray(classes.join(",")) as HTMLElement[])
        : items;

      // adjust the display property of each item ("none" for filtered ones, "inline-flex" for matching ones)
      items.forEach((item) => {
        item.style.display =
          matches.indexOf(item) === -1 ? "none" : "inline-flex";
      });

      // animate from the previous state
      Flip.from(state, {
        duration: 0.7,
        scale: true,
        ease: "power1.inOut",
        stagger: 0.08,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
      });

      // Update the all checkbox:
      allCheckbox.checked = matches.length === items.length;
    }

    filters.forEach((btn) => btn.addEventListener("click", updateFilters));
    allCheckbox?.addEventListener("click", () => {
      filters.forEach((checkbox) => (checkbox.checked = allCheckbox.checked));
      updateFilters();
    });

    return () => {
      filters.forEach((btn) => btn.removeEventListener("click", updateFilters));
      allCheckbox?.removeEventListener("click", () => {
        filters.forEach((checkbox) => (checkbox.checked = allCheckbox.checked));
        updateFilters();
      });
    };
  }, []);

  return (
    <main className="test">
      <div className="buttons-container">
        <div>Show:&nbsp;</div>
        <div>
          <label htmlFor="all">
            <input type="checkbox" id="all" defaultChecked /> All
          </label>
          <label htmlFor="green">
            <input
              type="checkbox"
              id="green"
              className="filter"
              defaultChecked
            />{" "}
            Green
          </label>
          <label htmlFor="orange">
            <input
              type="checkbox"
              id="orange"
              className="filter"
              defaultChecked
            />{" "}
            Orange
          </label>
          <label htmlFor="purple">
            <input
              type="checkbox"
              id="purple"
              className="filter"
              defaultChecked
            />{" "}
            Purple
          </label>
        </div>
      </div>
      <div className="container">
        <div className="item green"></div>
        <div className="item orange"></div>
        <div className="item purple"></div>
        <div className="item orange"></div>
        <div className="item green"></div>
        <div className="item purple"></div>
        <div className="item green"></div>
        <div className="item purple"></div>
      </div>
    </main>
  );
}
