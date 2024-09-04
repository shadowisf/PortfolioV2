import { useEffect, useState } from "react";

type ProgressiveImgProps = {
  realSrc: string;
  tinySrc: string;
  alt: string;
};

export default function ProgressiveImg({
  realSrc,
  tinySrc,
  alt,
}: ProgressiveImgProps) {
  const [imgSrc, setImgSrc] = useState(realSrc || tinySrc);

  useEffect(() => {
    const img = new Image();

    img.src = realSrc;

    img.onload = () => {
      setImgSrc(realSrc);
    };
  }, [realSrc]);

  return <img alt={alt} src={imgSrc} />;
}
