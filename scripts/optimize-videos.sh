#!/usr/bin/env bash
# Cuts the home page hover previews from the originals:
#
#   src/assets/videos_master/<Name>.webm    original, played as-is on the work page
#   src/assets/video_previews/<Name>.webm  short, small, 60fps clip for the hover
#
# The originals are only ever read. Re-run this whenever you add or replace one.

set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE_DIR="src/assets/videos_master"
PREVIEW_DIR="src/assets/video_previews"

# first PREVIEW_SECONDS, fits inside PREVIEW_W x PREVIEW_H, at the source frame
# rate (the originals are all ~60fps)
PREVIEW_SECONDS=15
PREVIEW_W=960
PREVIEW_H=540
PREVIEW_CRF=40
# A ceiling, not a target: simple clips still come in well under it, but a
# high-motion one cannot balloon to several MB. The whole preview set gets
# prefetched on desktop, so its total size is the number that matters.
PREVIEW_MAXRATE=500k

# a few clips open on a title card or a blank frame -- start their preview later
declare -A PREVIEW_START=(
  # [VideoExamiq]=5
)

command -v ffmpeg >/dev/null || { echo "ffmpeg not on PATH -- brew install ffmpeg" >&2; exit 1; }

# A homebrew upgrade once swapped the binary out from under a run, leaving half
# the set encoded by one version and half by another. Pin it for the whole run
# and fail loudly if it moves.
FFMPEG_BIN="$(command -v ffmpeg)"
FFMPEG_VERSION="$("$FFMPEG_BIN" -version | head -1)"
echo "using: $FFMPEG_VERSION"
echo

mkdir -p "$PREVIEW_DIR"

verify() { # decode every frame; anything the demuxer or decoder complains about is fatal
  local file="$1" complaints
  complaints="$("$FFMPEG_BIN" -nostdin -v error -i "$file" -f null - 2>&1 || true)"
  if [ -n "$complaints" ]; then
    echo "CORRUPT: $file" >&2
    echo "$complaints" >&2
    exit 1
  fi
}

human() { du -h "$1" | cut -f1 | tr -d ' '; }

shopt -s nullglob
sources=("$SOURCE_DIR"/*.webm)
[ ${#sources[@]} -gt 0 ] || { echo "no videos in $SOURCE_DIR" >&2; exit 1; }

total=0

for source in "${sources[@]}"; do
  name="$(basename "$source" .webm)"
  preview="$PREVIEW_DIR/$name.webm"
  start="${PREVIEW_START[$name]:-0}"

  echo "==> $name (${PREVIEW_SECONDS}s from ${start}s, <=${PREVIEW_W}x${PREVIEW_H})"
  "$FFMPEG_BIN" -nostdin -v error -y -ss "$start" -t "$PREVIEW_SECONDS" -i "$source" \
    -vf "scale=w=min($PREVIEW_W\,iw):h=min($PREVIEW_H\,ih):force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:v libvpx-vp9 -crf "$PREVIEW_CRF" -b:v "$PREVIEW_MAXRATE" \
    -row-mt 1 -tile-columns 2 -cpu-used 4 -deadline good \
    -g 120 -pix_fmt yuv420p -an \
    -f webm "$preview"
  verify "$preview"

  total=$(( total + $(stat -f%z "$preview") ))
  echo "    ok: $(human "$source") -> $(human "$preview")"
done

if [ "$("$FFMPEG_BIN" -version 2>/dev/null | head -1)" != "$FFMPEG_VERSION" ]; then
  echo "ffmpeg changed underneath this run -- re-run it from scratch" >&2
  exit 1
fi

printf '\n%s previews, all verified, %s KB total\n' "${#sources[@]}" "$(( total / 1024 ))"
