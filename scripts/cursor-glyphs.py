"""The cursor tile's letters as outlines, for its morph (TileCursor).

The tile's words are set in Kyiv Type Sans; to morph one label into another
-- a project's name into "next", ↗ into → -- the cursor needs each letter's
shape, not just its text. This writes every character the labels use, at the
two weights the tile changes between (the site's regular and heavy), with
each one's advance and the font's kerning between each pair, to
src/data/cursorGlyphs.json. TileCursor sets any label from them, at any
weight between, by easing each point from the one weight to the other.

Needs fonttools and uharfbuzz (pip install fonttools uharfbuzz). Run it again
when a project's name brings in a character not yet here:

    python3 scripts/cursor-glyphs.py
"""

import json
from pathlib import Path

import uharfbuzz as hb

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "src/fonts/KyivTypeSans-VarGX.ttf"
OUT = ROOT / "src/data/cursorGlyphs.json"

# every character a label might use: names, years, "soon", the arrows
CHARS = " abcdefghijklmnopqrstuvwxyz0123456789-–&.,'()/+:↗←→"
# the site's two weights ($fontVarNormal, $fontVarThin)
WEIGHTS = {"n": {"wght": 400, "CONT": 0}, "t": {"wght": 1000, "CONT": 1000}}


class SvgPen:
    """An outline as an svg path, y down, in font units."""

    def __init__(self):
        self.parts = []

    def _p(self, *pts):
        return " ".join(f"{round(x, 1):g} {round(-y, 1):g}" for x, y in pts)

    def moveTo(self, p):
        self.parts.append("M" + self._p(p))

    def lineTo(self, p):
        self.parts.append("L" + self._p(p))

    def qCurveTo(self, *pts):
        # one control point to a point, as harfbuzz draws them
        self.parts.append("Q" + self._p(*pts))

    def curveTo(self, *pts):
        self.parts.append("C" + self._p(*pts))

    def closePath(self):
        self.parts.append("Z")

    def endPath(self):
        pass


def shape(font, text):
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    return buf.glyph_infos, buf.glyph_positions


def main():
    blob = hb.Blob.from_file_path(str(FONT))
    face = hb.Face(blob)
    out = {"unitsPerEm": face.upem, "glyphs": {}, "kern": {}}

    fonts = {}
    for key, axes in WEIGHTS.items():
        font = hb.Font(face)
        font.set_variations(axes)
        fonts[key] = font

    advances = {}
    for ch in CHARS:
        entry = {}
        for key, font in fonts.items():
            infos, positions = shape(font, ch)
            assert len(infos) == 1, f"{ch!r} shapes to {len(infos)} glyphs"
            pen = SvgPen()
            font.draw_glyph_with_pen(infos[0].codepoint, pen)
            entry[key] = {"d": " ".join(pen.parts), "adv": positions[0].x_advance}
            advances[(ch, key)] = positions[0].x_advance
        # the two weights must share their points, to ease between them
        strip = lambda d: "".join(c for c in d if c.isalpha())
        entry["same"] = strip(entry["n"]["d"]) == strip(entry["t"]["d"])
        out["glyphs"][ch] = entry

    for a in CHARS:
        for b in CHARS:
            kern = []
            for key, font in fonts.items():
                infos, positions = shape(font, a + b)
                if len(infos) != 2:
                    raise SystemExit(f"{a + b!r} forms a ligature")
                kern.append(positions[0].x_advance - advances[(a, key)])
            if any(kern):
                out["kern"][a + b] = kern

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    unshared = [ch for ch, g in out["glyphs"].items() if not g["same"]]
    print(f"{len(CHARS)} glyphs, {len(out['kern'])} kerning pairs -> {OUT.relative_to(ROOT)}")
    if unshared:
        print("not point-compatible between weights:", "".join(unshared))


if __name__ == "__main__":
    main()
