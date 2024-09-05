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
    const loadImage = async () => {
      const image = new Image();
      image.src = realSrc;

      await new Promise((resolve, reject) => {
        image.onload = () => resolve(null);
        image.onerror = () => reject(new Error("image load failed"));
      });

      setImageLoaded(true);
    };

    loadImage().catch(console.error); // Handle errors
  }, [realSrc]);

  return !imageLoaded ? (
    <img style={{ backgroundColor: "var(--faded-color)" }} />
  ) : (
    <img src={realSrc} alt={alt} />
  );
}
