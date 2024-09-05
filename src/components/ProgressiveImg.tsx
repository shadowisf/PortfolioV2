import { useEffect, useState } from "react";
import { getProfilePictureTiny } from "../pages/About";
import { getAllProjectIDs, getProjectData } from "../utils/ProjectUtils";

type ProgressiveImgProps = {
  realSrc: string;
  placeholderSrc: string;
  alt: string;
  zoom?: boolean;
};

export default function ProgressiveImg({
  realSrc,
  placeholderSrc,
  alt,
  zoom,
}: ProgressiveImgProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  async function loadImage() {
    const image = new Image();
    image.src = realSrc;

    await new Promise((resolve) => {
      image.onload = () => resolve(null);
      image.onerror = () => console.log("error loading image");
    });

    setImageLoaded(true);
  }

  useEffect(() => {
    setImageLoaded(false);

    requestAnimationFrame(() => {
      loadImage();
    });
  }, [realSrc]);

  return !imageLoaded ? (
    <img src={placeholderSrc} />
  ) : (
    <img src={realSrc} alt={alt} data-action={zoom ? "zoom" : ""} />
  );
}

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(src);
    };
    img.onerror = () => {
      reject(src);
    };
  });
}

async function preloadImages(imagesURL: string[]) {
  try {
    await Promise.all(imagesURL.map((src) => preloadImage(src)));
  } catch (error) {
    console.log(error);
  }
}

export function preloadTinyImages() {
  const images: string[] = [];
  const allProjectIDs = getAllProjectIDs();

  allProjectIDs.forEach((id) => {
    const project = getProjectData(Number(id));

    images.push(project.imageTiny);
  });

  images.push(getProfilePictureTiny());

  preloadImages(images);
}
