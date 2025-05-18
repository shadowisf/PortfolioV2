// utils/fontLoader.ts
export async function preloadFonts(fonts: { name: string; url: string }[]) {
  try {
    await Promise.all(
      fonts.map(({ name, url }) => {
        const font = new FontFace(name, `url(${url})`, {
          style: "normal",
          weight: "normal",
          display: "swap", // fallback while loading
        });

        return font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
        });
      })
    );
  } catch (err) {
    console.error("Error preloading fonts:", err);
  }
}
