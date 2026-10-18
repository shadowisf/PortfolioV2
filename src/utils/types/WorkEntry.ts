import { ReactElement } from "react";

export type WorkEntry = {
  type: string;
  name: string;
  year: string;
  // one short line for its home page tile, apple-style; the type stands in
  // when there is none
  tagline?: string;
  techStack: string[];
  // the three that matter most, for its home page tile: frontend, backend,
  // database, in that order -- leaving out any it does not have
  keyStack?: string[];
  image: string;
  imageFlex: string;
  imageAlt: string;
  video: string;
  videoPreview: string;
  // the same clip as hevc, for safari and ios (scripts/optimize-videos.sh):
  // they decode vp9 in software, if at all, and a 1080p60 preview stalled;
  // hevc they decode in hardware. With alpha for a preview cut out to a
  // transparent background, which they would show on black as a webm.
  videoPreviewHevc?: string;
  // the frame the hover starts on (previewStart), cut by
  // scripts/optimize-videos.sh -- the still its home page tile shows until
  // hovered. Re-cut it with --posters-only after changing previewStart.
  videoPoster: string;
  // seconds into the preview that the hover starts playing; omit for 0
  previewStart?: number;
  // "light" for a clip too dark for the usual dark chips over its home page
  // tile, and the dark cursor over it: both then take the light theme
  overlayTheme?: "light";
  videoFlex: string;
  status: ReactElement;
  description: ReactElement;
  myRole: ReactElement;
  links: ReactElement;
};
