#!/usr/bin/env bash
# Cuts the home page hover previews from the originals:
#
#   src/assets/videos_master/<Name>.webm    original, played as-is on the work page
#   src/assets/video_previews/<Name>.webm  full-length, up to 1080p, 60fps hover clip
#   src/assets/video_previews/<Name>.mov   the same as hevc, for a clip cut out to a
#                                          transparent background (see CUTOUT below)
#   src/assets/video_posters/<Name>.webp   the frame its hover starts on, shown until hovered
#
# The originals are only ever read. Re-run this whenever you add or replace one.
#
#   ./scripts/optimize-videos.sh                       everything
#   ./scripts/optimize-videos.sh VideoExamiq            just the named clips
#   ./scripts/optimize-videos.sh --posters-only [...]   posters from the previews already cut --
#                                                       re-run after changing a previewStart

set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE_DIR="src/assets/videos_master"
PREVIEW_DIR="src/assets/video_previews"
POSTER_DIR="src/assets/video_posters"

# Full length at the source frame rate (the originals are all ~60fps). Full
# length is the point: the hover seeks to whatever timestamp a project sets as
# previewStart, so retiming is a data edit rather than a re-encode.
#
# Sized for the home page's tiles, which run up to 1260px wide -- 2520 real
# pixels on a retina screen -- so up to 1080p. The old 640x360 was cut for a
# small floating preview and went soft once stretched across a tile.
PREVIEW_W=1920
PREVIEW_H=1080
PREVIEW_CRF=32
# A ceiling, not a target: simple clips come in well under it, but a
# high-motion one cannot balloon. Only the first couple of tiles are
# prefetched now (useVideoPreloader); the rest load when hovered.
PREVIEW_MAXRATE=2M
# the hevc copy of a cut-out clip (videotoolbox's constant quality, 1-100)
HEVC_QUALITY=45

# The poster is cut from the preview itself, at the project's previewStart, so
# the still a tile shows is exactly the frame its hover opens on.
POSTER_QUALITY=80

posters_only=false
if [ "${1:-}" = "--posters-only" ]; then
  posters_only=true
  shift
fi

command -v ffmpeg >/dev/null || { echo "ffmpeg not on PATH -- brew install ffmpeg" >&2; exit 1; }
# homebrew's ffmpeg is built without a webp encoder, hence cwebp
command -v cwebp >/dev/null || { echo "cwebp not on PATH -- brew install webp" >&2; exit 1; }

# A homebrew upgrade once swapped the binary out from under a run, leaving half
# the set encoded by one version and half by another. Pin it for the whole run
# and fail loudly if it moves.
FFMPEG_BIN="$(command -v ffmpeg)"
FFMPEG_VERSION="$("$FFMPEG_BIN" -version | head -1)"
echo "using: $FFMPEG_VERSION"
echo

mkdir -p "$PREVIEW_DIR" "$POSTER_DIR"

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

preview_start() { # the previewStart of whichever project file uses this preview; 0 if none
  local name="$1" data start
  data="$(grep -l "video_previews/$name.webm" src/data/work/*.tsx 2>/dev/null | head -1 || true)"
  [ -n "$data" ] && start="$(sed -nE 's/^[[:space:]]*previewStart:[[:space:]]*([0-9.]+),?.*/\1/p' "$data" | head -1)"
  echo "${start:-0}"
}

poster() { # the frame a preview's hover starts on, as a webp
  local preview="$1" name start frame
  name="$(basename "$preview" .webm)"
  start="$(preview_start "$name")"
  frame="$POSTER_DIR/.$name.frame.png"
  # -ss before -i is still frame-exact when decoding, and fast. Decoded with
  # libvpx, which keeps a cut-out clip's transparency (ffmpeg's own vp9
  # decoder drops it); cwebp keeps it too, and drops it where all is opaque.
  "$FFMPEG_BIN" -nostdin -v error -y -c:v libvpx-vp9 -ss "$start" -i "$preview" \
    -frames:v 1 -pix_fmt rgba "$frame"
  [ -s "$frame" ] || { echo "no frame at ${start}s in $preview" >&2; exit 1; }
  cwebp -quiet -q "$POSTER_QUALITY" "$frame" -o "$POSTER_DIR/$name.webp"
  rm -f "$frame"
  echo "    poster at ${start}s: $(human "$POSTER_DIR/$name.webp")"
}

shopt -s nullglob
if [ $# -gt 0 ]; then
  # re-cut just the named clips, e.g. ./scripts/optimize-videos.sh VideoExamiq
  sources=()
  for name in "$@"; do
    candidate="$SOURCE_DIR/${name%.webm}.webm"
    [ -f "$candidate" ] || { echo "no such video: $candidate" >&2; exit 1; }
    sources+=("$candidate")
  done
else
  sources=("$SOURCE_DIR"/*.webm)
fi
[ ${#sources[@]} -gt 0 ] || { echo "no videos in $SOURCE_DIR" >&2; exit 1; }

total=0

for source in "${sources[@]}"; do
  name="$(basename "$source" .webm)"
  preview="$PREVIEW_DIR/$name.webm"

  if $posters_only; then
    [ -f "$preview" ] || { echo "no preview yet for $name -- cut it first" >&2; exit 1; }
    echo "==> $name (poster)"
    poster "$preview"
    continue
  fi

  # Encode beside the real file and only swap it in once it verifies. Writing
  # straight over it meant a run cut short left a half-written preview in
  # place of a good one.
  partial="$PREVIEW_DIR/.$name.partial.webm"
  trap 'rm -f "$partial"' EXIT

  scale="scale=w=min($PREVIEW_W\,iw):h=min($PREVIEW_H\,ih):force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"

  # CUTOUT: a phone recording shown on its own (feeltok) is cut out of the
  # simulator window it was recorded in, so the page shows round the phone.
  # The phone's silhouette (phone-mask.py) becomes the clip's alpha -- one
  # image, which the merge repeats for every frame. Webm carries the alpha
  # for chrome, edge and firefox; safari cannot show a transparent webm (it
  # plays it on black), so these clips are cut a second time as hevc with
  # alpha, <Name>.mov, which it can.
  cutout=false
  case "$name" in
    VideoFeelTok) cutout=true ;;
  esac

  inputs=(-i "$source")
  graph="[0:v]$scale,format=yuv420p[v]"
  pix_fmt=yuv420p
  if $cutout; then
    mask="$PREVIEW_DIR/.$name.mask.pgm"
    trap 'rm -f "$partial" "$mask" "$PREVIEW_DIR/.$name.partial.mov"' EXIT
    python3 scripts/phone-mask.py "$source" "$mask"
    inputs+=(-i "$mask")
    graph="[1:v]format=gray[alpha];[0:v][alpha]alphamerge,$scale,format=yuva420p[v]"
    pix_fmt=yuva420p
  fi

  echo "==> $name (full length, <=${PREVIEW_W}x${PREVIEW_H}$($cutout && echo ", cut out"))"
  "$FFMPEG_BIN" -nostdin -v error -y "${inputs[@]}" \
    -filter_complex "$graph" -map "[v]" \
    -c:v libvpx-vp9 -crf "$PREVIEW_CRF" -b:v "$PREVIEW_MAXRATE" \
    -row-mt 1 -tile-columns 2 -cpu-used 4 -deadline good \
    -g 120 -pix_fmt "$pix_fmt" -an \
    -f webm "$partial"
  verify "$partial"
  mv "$partial" "$preview"

  total=$(( total + $(stat -f%z "$preview") ))
  echo "    ok: $(human "$source") -> $(human "$preview")"

  if $cutout; then
    # safari's copy: hevc with alpha, from macos's own encoder, at a constant
    # quality comparable to the webm's
    hevc="$PREVIEW_DIR/$name.mov"
    hevc_partial="$PREVIEW_DIR/.$name.partial.mov"
    "$FFMPEG_BIN" -nostdin -v error -y "${inputs[@]}" \
      -filter_complex "[1:v]format=gray[alpha];[0:v][alpha]alphamerge,$scale,format=bgra[v]" -map "[v]" \
      -c:v hevc_videotoolbox -q:v "$HEVC_QUALITY" -alpha_quality 0.75 -tag:v hvc1 -an \
      -f mov "$hevc_partial"
    verify "$hevc_partial"
    mv "$hevc_partial" "$hevc"
    rm -f "$mask"
    total=$(( total + $(stat -f%z "$hevc") ))
    echo "    ok: safari's copy -> $(human "$hevc")"
  fi

  poster "$preview"
done

if [ "$("$FFMPEG_BIN" -version 2>/dev/null | head -1)" != "$FFMPEG_VERSION" ]; then
  echo "ffmpeg changed underneath this run -- re-run it from scratch" >&2
  exit 1
fi

$posters_only && { printf '\n%s posters\n' "${#sources[@]}"; exit 0; }

printf '\n%s previews, all verified, %s KB total\n' "${#sources[@]}" "$(( total / 1024 ))"
