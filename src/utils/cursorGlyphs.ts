import data from "../data/cursorGlyphs.json";

// The cursor tile's letters as outlines (scripts/cursor-glyphs.py), so its
// morph can turn one label's letters into another's: any line of them set
// as one svg path, where the text it stands in for sits, at its size and
// weight -- the font's regular, its heavy, or anywhere between, each point
// eased from the one to the other as the font itself does.

type Weighted = { d: string; adv: number };
type Glyph = { n: Weighted; t: Weighted; same: boolean };
const glyphs = data.glyphs as Record<string, Glyph>;
// each pair's kerning at the regular weight and the heavy
const kerning: Record<string, number[]> = data.kern;
const UPEM = data.unitsPerEm;

// a glyph's path, split once into its commands and the numbers of each
type Parsed = { commands: string[]; n: number[][]; t: number[][] };
const parsed = new Map<string, Parsed>();

function split(d: string) {
  const commands: string[] = [];
  const numbers: number[][] = [];
  for (const [, command, args] of d.matchAll(/([MLQCZ])([^MLQCZ]*)/g)) {
    commands.push(command);
    numbers.push(args.trim() ? args.trim().split(/\s+/).map(Number) : []);
  }
  return { commands, numbers };
}

function parse(ch: string): Parsed | null {
  const glyph = glyphs[ch];
  if (!glyph) return null;
  let entry = parsed.get(ch);
  if (!entry) {
    const n = split(glyph.n.d);
    const t = glyph.same ? split(glyph.t.d) : n;
    entry = { commands: n.commands, n: n.numbers, t: t.numbers };
    parsed.set(ch, entry);
  }
  return entry;
}

const lerp = (a: number, b: number, at: number) => a + (b - a) * at;

// How far between the two weights a text is, 0 the regular, 1 the heavy:
// off its font-variation-settings, its wght running 400 to 1000 (main.scss).
export function weightOf(el: Element) {
  const settings = getComputedStyle(el).fontVariationSettings;
  const wght = Number(/"wght"\s+([\d.]+)/.exec(settings)?.[1] ?? 400);
  return Math.min(1, Math.max(0, (wght - 400) / 600));
}

// Where a text's letters begin and their baseline, in the window: a box of
// no size set before them stands on the baseline at the first letter.
export function originOf(el: HTMLElement) {
  const probe = document.createElement("span");
  probe.style.cssText = "display:inline-block;width:0;height:0;padding:0;margin:0";
  el.prepend(probe);
  const box = probe.getBoundingClientRect();
  probe.remove();
  return { x: box.left, y: box.bottom };
}

// A line's letters, a path each (spaces have none), its first letter's
// baseline at (x, y), `size` its font size in px, `weight` from the
// regular (0) to the heavy (1).
export function lettersOf(text: string, size: number, weight: number, x: number, y: number) {
  const scale = size / UPEM;
  const heavy = weight >= 0.5;
  const letters: string[] = [];
  let pen = 0;
  let previous = "";
  for (const ch of text) {
    const kern = kerning[previous + ch];
    if (kern) pen += lerp(kern[0], kern[1], weight);
    const glyph = glyphs[ch];
    const shape = parse(ch);
    if (glyph && shape) {
      // eased between the weights where the two share their points; the
      // nearer weight's own where they do not
      const from = glyph.same ? shape.n : heavy ? shape.t : shape.n;
      const to = glyph.same ? shape.t : from;
      const parts: string[] = [];
      shape.commands.forEach((command, i) => {
        const coords = from[i].map((value, j) => {
          const v = lerp(value, to[i][j], glyph.same ? weight : 0);
          return j % 2 === 0 ? x + (pen + v) * scale : y + v * scale;
        });
        parts.push(command + coords.map((v) => v.toFixed(2)).join(" "));
      });
      if (parts.length) letters.push(parts.join(""));
      pen += glyph.same ? lerp(glyph.n.adv, glyph.t.adv, weight) : heavy ? glyph.t.adv : glyph.n.adv;
    } else {
      // a character not drawn here takes a space's room
      pen += glyphs[" "].n.adv;
    }
    previous = ch;
  }
  return letters;
}

// a text element's own letters, where it sits, in the window
export function lettersIn(el: HTMLElement, weight = weightOf(el)) {
  const { x, y } = originOf(el);
  const size = parseFloat(getComputedStyle(el).fontSize);
  return lettersOf(el.textContent ?? "", size, weight, x, y);
}
