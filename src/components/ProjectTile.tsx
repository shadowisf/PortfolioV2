import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { workMapping } from "../utils/_logic/workMapping";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useHomeAnimation } from "../utils/gsap/useHomeAnimation";

export type ProjectProps = {
  dataID: number;
  onClick?: () => void;
};

export function ProjectTile(p: ProjectProps) {
  const { isMobile, executeTransition } = useGlobalState();
  const { togglePreview, resetPreview, movePreview } = useHomeAnimation();

  const [isHighlighted, setIsHighlighted] = useState(false);

  const project = workMapping[p.dataID];
  const title = project.name.replace(/\s+/g, "-") || "";

  useEffect(() => {
    isMobile && isHighlighted ? resetPreview() : "";
  }, [isMobile]);

  return (
    <Link
      to={`${title}`}
      onClick={(e) => executeTransition(e, title, false)}
      className="tile hover all"
      onMouseEnter={() => {
        isMobile ? null : togglePreview(p.dataID);
        setIsHighlighted(true);
      }}
      onMouseLeave={() => {
        isMobile ? null : resetPreview();
        setIsHighlighted(false);
      }}
      onMouseMove={(event) => {
        isMobile ? null : movePreview(p.dataID, event);
      }}
    >
      <h5 className="title">{project.name}</h5>
      <small className="year">{project.year}</small>
    </Link>
  );
}

export function ProjectTilePlaceholder() {
  return (
    <div className="tile">
      <h5 className="title">????</h5>
      <small>???</small>
    </div>
  );
}
