import { ReactElement } from "react";

export type WorkEntry = {
  type: string;
  name: string;
  year: string;
  techStack: string[];
  image: string;
  imageFlex: string;
  imageAlt: string;
  video: string;
  videoPreview: string;
  // seconds into the preview that the hover starts playing; omit for 0
  previewStart?: number;
  videoFlex: string;
  status: ReactElement;
  description: ReactElement;
  myRole: ReactElement;
  links: ReactElement;
};
