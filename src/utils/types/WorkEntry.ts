import { ReactElement } from "react";

export type WorkEntry = {
  name: string;
  year: string;
  techStack: string[];
  image: string;
  imageFlex: string;
  imageAlt: string;
  video: string;
  videoFlex: string;
  status: ReactElement;
  description: ReactElement;
  myRole: ReactElement;
  links: ReactElement;
};
