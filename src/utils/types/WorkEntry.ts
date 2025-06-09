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
  description: ReactElement;
  myRole: ReactElement;
  links: ReactElement;
  attributions?: string[];
};
