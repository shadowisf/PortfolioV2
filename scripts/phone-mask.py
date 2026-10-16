#!/usr/bin/env python3
"""The silhouette of the phone in a screen recording, as an alpha mask.

    python3 scripts/phone-mask.py <recording> <mask.pgm>

For a phone recording shown on its own (feeltok): the phone is cut out of the
simulator window it was recorded in, so the page shows round it. Used by
scripts/optimize-videos.sh.

The phone never moves in the recording, so one silhouette serves the whole
clip. Outside is the window's 3px border, and every pixel of backdrop grey
(22-48, the window's backdrop runs 28-37) that can be reached from it -- which
stops at the phone's dark rim and black bezel (0-18), so nothing on the screen
inside them is ever touched, whatever colour it is. A few moments are traced
and outvoted against each other, which settles the odd pixel of compression
noise along the rim, and the edge is softened by a pixel so it is not jagged.
"""

import subprocess
import sys
from collections import deque

EDGE = 3
BACKDROP = (22, 48)
MOMENTS = (5, 25, 45)


def size(recording):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries",
         "stream=width,height", "-of", "csv=p=0", recording],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    w, h = out.split(",")
    return int(w), int(h)


def frame(recording, seconds):
    return subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-ss", str(seconds), "-i", recording,
         "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
        capture_output=True, check=True,
    ).stdout


def outside(gray, w, h):
    lo, hi = BACKDROP
    out = bytearray(w * h)
    queue = deque()
    for y in range(h):
        for x in range(w):
            if x < EDGE or y < EDGE or x >= w - EDGE or y >= h - EDGE:
                out[y * w + x] = 1
                queue.append(y * w + x)
    while queue:
        i = queue.popleft()
        x, y = i % w, i // w
        for j, ok in ((i - 1, x > 0), (i + 1, x < w - 1), (i - w, y > 0), (i + w, y < h - 1)):
            if ok and not out[j] and lo <= gray[j] <= hi:
                out[j] = 1
                queue.append(j)
    return out


def main(recording, mask_path):
    w, h = size(recording)
    traces = [outside(frame(recording, t), w, h) for t in MOMENTS]
    # opaque inside the phone, by majority
    alpha = bytearray(0 if sum(t[i] for t in traces) * 2 > len(traces) else 255 for i in range(w * h))
    # a pixel's worth of softness along the edge: a 3x3 average, only where
    # the neighbourhood is mixed
    soft = bytearray(alpha)
    for y in range(1, h - 1):
        row = y * w
        for x in range(1, w - 1):
            i = row + x
            block = (
                alpha[i - w - 1] + alpha[i - w] + alpha[i - w + 1]
                + alpha[i - 1] + alpha[i] + alpha[i + 1]
                + alpha[i + w - 1] + alpha[i + w] + alpha[i + w + 1]
            )
            if 0 < block < 9 * 255:
                soft[i] = block // 9
    with open(mask_path, "wb") as f:
        f.write(b"P5\n%d %d\n255\n" % (w, h))
        f.write(bytes(soft))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
