import { Fragment } from "react/jsx-runtime";
import {
  getProjectArchitecture,
  getProjectContent,
  getProjectImage,
  getProjectLinks,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useEffect, useState } from "react";

export default function ProjectPage({ dataID }: ProjectProps) {
  const [ifData5, setIfData5] = useState(false);

  useEffect(() => {
    if (dataID === 5 || dataID === 6) {
      setIfData5(true);
    }
  }, []);

  return (
    <section data-key={dataID}>
      <div className="header">
        <h1 className="title accent">{getProjectName(dataID)}</h1>
        <h2 className="year faded">{getProjectYear(dataID)}</h2>
      </div>

      <div className="architecture">
        {getProjectArchitecture(dataID).map((item, index, arr) => (
          <Fragment key={index}>
            <h5 className="item">{item}</h5>
            {index < arr.length - 1 && <h5 className="noCursor"> • </h5>}
          </Fragment>
        ))}
      </div>

      <div className="projectPage">
        <div className="content">{getProjectContent(dataID)}</div>

        {ifData5 ? (
          <div>
            <b>attributions:</b>
            <br />
            <br />
            <div className="links">{getProjectLinks(dataID)}</div>
          </div>
        ) : (
          <div className="links">{getProjectLinks(dataID)}</div>
        )}

        <div className="imageContainer noCursor">
          {getProjectImage(dataID).map((item, index) => (
            <img key={index} src={item} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
