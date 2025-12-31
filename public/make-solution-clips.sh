#!/usr/bin/env bash
set -euo pipefail

IN="${1:-$HOME/wingit-landing/public/demo.mp4}"
OUTDIR="${2:-$HOME/wingit-landing/public/gifs}"

mkdir -p "$OUTDIR"

echo "Input:  $IN"
echo "Output: $OUTDIR"
echo

# ---- 1) Find scene-change timestamps (good cut candidates) ----
# Threshold: lower = more cuts, higher = fewer cuts.
# 0.35 is a decent start for screen recordings.
SCENE_THRESHOLD="${SCENE_THRESHOLD:-0.35}"

echo "Detecting scene changes (threshold=$SCENE_THRESHOLD)..."
mapfile -t SCENES < <(
  ffmpeg -hide_banner -i "$IN" \
    -vf "select='gt(scene,${SCENE_THRESHOLD})',showinfo" \
    -f null - 2>&1 \
  | awk -F'pts_time:' '/showinfo/ {split($2,a," "); print a[1]}' \
  | awk 'NF' \
  | head -n 30
)

if [ "${#SCENES[@]}" -lt 5 ]; then
  echo "Not enough scene cuts found. Falling back to evenly spaced timestamps."
  # fallback: 5 clips starting at 5s, then every 10s
  SCENES=(5 15 25 35 45 55 65 75)
fi

# ---- 2) Pick 5 timestamps, spaced out so clips aren’t too similar ----
# Minimum gap between chosen starts (seconds)
MIN_GAP="${MIN_GAP:-8}"

pick_times=()
last=-9999

for t in "${SCENES[@]}"; do
  # ensure numeric
  tt=$(printf "%.0f" "$t" 2>/dev/null || echo "")
  if [ -z "$tt" ]; then continue; fi
  if [ $((tt - last)) -ge "$MIN_GAP" ]; then
    pick_times+=("$tt")
    last="$tt"
  fi
  [ "${#pick_times[@]}" -ge 5 ] && break
done

# If still short, add more evenly spaced
while [ "${#pick_times[@]}" -lt 5 ]; do
  next=$(( last + 10 ))
  pick_times+=("$next")
  last="$next"
done

echo "Chosen start times (seconds): ${pick_times[*]}"
echo

# ---- 3) Helpers to export GIF + MP4 loop ----
make_gif () {
  local start="$1"
  local dur="$2"
  local out="$3"

  # Palette gen (best quality / smallest reasonable GIF)
  ffmpeg -y -ss "$start" -t "$dur" -i "$IN" \
    -vf "fps=12,scale=960:-2:flags=lanczos,palettegen" \
    /tmp/wingit_palette.png >/dev/null 2>&1

  ffmpeg -y -ss "$start" -t "$dur" -i "$IN" -i /tmp/wingit_palette.png \
    -lavfi "fps=12,scale=960:-2:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" \
    "$out" >/dev/null 2>&1
}

make_mp4 () {
  local start="$1"
  local dur="$2"
  local out="$3"

  # Silent loop video (autoplay-friendly)
  ffmpeg -y -ss "$start" -t "$dur" -i "$IN" \
    -vf "scale=1280:-2:flags=lanczos,fps=30" \
    -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
    -an -movflags +faststart \
    "$out" >/dev/null 2>&1
}

# ---- 4) Export 5 solution clips ----
# You can rename labels however you want.
labels=(presentations meetings lessons podcasts video-calls)
DUR="${DUR:-6}"

for i in {0..4}; do
  label="${labels[$i]}"
  start="${pick_times[$i]}"

  echo "Exporting $label @ ${start}s (dur ${DUR}s)..."

  make_gif "$start" "$DUR" "$OUTDIR/$label.gif"
  make_mp4 "$start" "$DUR" "$OUTDIR/$label.mp4"

  echo "  -> $OUTDIR/$label.gif"
  echo "  -> $OUTDIR/$label.mp4"
done

echo
echo "Done."
echo "TIP: MP4 loops are smaller + smoother. Use .mp4 in your page.tsx for best results."

