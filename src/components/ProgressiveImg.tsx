import { useEffect, useState } from "react";

type ProgressiveImgProps = {
  realSrc: string;
  placeholderSrc: string;
  alt: string;
};

export default function ProgressiveImg({
  realSrc,
  placeholderSrc,
  alt,
}: ProgressiveImgProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };

    image.src = realSrc;
  }, [realSrc]);

  return !imageLoaded ? (
    <img src={placeholderSrc} />
  ) : (
    <img src={realSrc} alt={alt} />
  );
}
