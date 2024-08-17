import gsap from "gsap";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getLuminance(color: string) {
  const hex = color.slice(1);
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const sRGB = [r, g, b].map((channel) =>
    channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4)
  );
  return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
}

function calculateContrastRatio(
  foregroundColor: string,
  backgroundColor: string
) {
  const calculateContrast = (foreground: any, background: any) => {
    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  return calculateContrast(foregroundColor, backgroundColor);
}

const highlightedTexts = [".homeWrapper .name", ".projectWrapper .title"];

const fadedTexts = [
  ".homeWrapper .year",
  ".projectWrapper .year",
  ".homeWrapper .links",
];

export function generateTheme() {
  let bgColor, tColor;

  do {
    bgColor = getRandomColor();
    tColor = getRandomColor();
  } while (
    calculateContrastRatio(tColor, bgColor) < 7 ||
    calculateContrastRatio(tColor, bgColor) < 4.5 ||
    calculateContrastRatio(bgColor, tColor) < 7
  );

  document.documentElement.style.setProperty("--text-color", tColor);
  document.documentElement.style.setProperty("--background-color", bgColor);
  document.documentElement.style.setProperty("--faded-color", "#");
  document.documentElement.style.setProperty("--accent-color", tColor);

  gsap.set(highlightedTexts, {
    backgroundColor: "var(--text-color)",
    color: "var(--background-color",
  });
  gsap.set(fadedTexts, {
    autoAlpha: "0.5",
  });
}

export function resetTheme(
  textColor: string,
  backgroundColor: string,
  accentColor: string,
  fadedColor: string
) {
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty(
    "--background-color",
    backgroundColor
  );
  document.documentElement.style.setProperty("--faded-color", fadedColor);
  document.documentElement.style.setProperty("--accent-color", accentColor);

  gsap.set(highlightedTexts, { clearProps: "all" });
  gsap.set(fadedTexts, { clearProps: "all" });
}