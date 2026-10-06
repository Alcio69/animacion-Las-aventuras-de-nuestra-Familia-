#!/usr/bin/env bash
# Render several chapters (3D) one after another, skipping finished ones. Safe to re-run after a
# container restart: render.mjs resumes from the chunks on disk.
# Usage: setsid nohup scripts/render-queue.sh ep12-x ep13-y > out/logs/queue.log 2>&1 < /dev/null & disown
cd "$(dirname "$0")/.." || exit 1
mkdir -p out/logs
# leftover bundles from renders killed by a restart (each holds a copy of every video)
rm -rf /tmp/remotion-webpack-bundle-*
for e in "$@"; do
  [ -f "public/episodes/$e-3d.mp4" ] && { echo "SKIP $e"; continue; }
  for try in 1 2; do
    echo "START $e try $try $(date)"
    if npm run render -- "$e" 3d >> "out/logs/$e.log" 2>&1; then echo "DONE $e $(date)"; break; fi
    echo "FAIL $e try $try $(date)"
  done
done
echo ALLDONE
