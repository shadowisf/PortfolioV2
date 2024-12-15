import { useEffect, useState } from "react";
import ProfilePictureTiny from "../assets/ImageProfile_tiny.webp";

type ProgressiveImgProps = {
  realSrc: string;
  placeholderSrc: string;
  alt: string;
  zoom?: boolean;
};

export default function ProgressiveImg(p: ProgressiveImgProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  async function loadImage() {
    const image = new Image();
    image.src = p.realSrc;

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
  }, [p.realSrc]);

  return !imageLoaded ? (
    <img src={p.placeholderSrc} />
  ) : (
    <img src={p.realSrc} alt={p.alt} data-action={p.zoom ? "zoom" : ""} />
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

  images.push(ProfilePictureTiny);

  preloadImages(images);
}
