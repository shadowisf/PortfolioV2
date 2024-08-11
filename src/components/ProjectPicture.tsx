import { projectData } from "../pages/Index";

function getPicture(dataID: number) {
  return projectData[dataID].picture;
}

type ProjectPictureProps = {
  dataID: number;
};

export default function ProjectPicture({ dataID }: ProjectPictureProps) {
  return (
    <div data-key={dataID} className="picture">
      <img src={getPicture(dataID)} />
    </div>
  );
}
