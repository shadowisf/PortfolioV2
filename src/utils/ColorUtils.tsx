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

export function generateTheme() {
  let bgColor, textColor;

  do {
    bgColor = getRandomColor();
    textColor = getRandomColor();
  } while (
    calculateContrastRatio(textColor, bgColor) < 7 ||
    calculateContrastRatio(textColor, bgColor) < 4.5 ||
    calculateContrastRatio(bgColor, textColor) < 7
  );

  requestAnimationFrame(() => {
    document.documentElement.style.setProperty("--text-color", textColor);
    document.documentElement.style.setProperty("--background-color", bgColor);
    document.documentElement.style.setProperty("--text-faded-color", "#");
    document.documentElement.style.setProperty("--accent-color", textColor);
  });
}
