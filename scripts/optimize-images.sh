#!/usr/bin/env bash
# Caps the .webp stills in src/assets/images at MAX_WIDTH and re-encodes them.
#
# Every still is now also the poster for its home page preview, so all of them
# load up front -- a handful were sitting at 3360px wide, roughly 4x the pixels
# anything on the site ever displays. Rewrites in place; the originals are in
# git if you need them back.

set -euo pipefail

cd "$(dirname "$0")/.."

MAX_WIDTH=1920
QUALITY=82

total_before=0
total_after=0

for image in src/assets/images/*.webp; do
  width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$image")
  before=$(stat -f%z "$image")
  total_before=$(( total_before + before ))

  if [ "$width" -le "$MAX_WIDTH" ]; then
    echo "skip $(basename "$image") (${width}px)"
    total_after=$(( total_after + before ))
    continue
  fi

  tmp="${image}.tmp"
  cwebp -quiet -q "$QUALITY" -resize "$MAX_WIDTH" 0 "$image" -o "$tmp"
  mv "$tmp" "$image"

  after=$(stat -f%z "$image")
  total_after=$(( total_after + after ))
  printf '%s %spx -> %spx, %sK -> %sK\n' \
    "$(basename "$image")" "$width" "$MAX_WIDTH" \
    "$(( before / 1024 ))" "$(( after / 1024 ))"
done

printf '\nstills: %sK -> %sK\n' "$(( total_before / 1024 ))" "$(( total_after / 1024 ))"
