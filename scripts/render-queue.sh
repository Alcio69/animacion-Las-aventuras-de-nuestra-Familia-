#!/usr/bin/env bash
# Render several chapters (3D) one after another, skipping finished ones. Safe to re-run after a
# container restart: render.mjs resumes from the chunks on disk.
# Usage: setsid nohup scripts/render-queue.sh ep12-x ep13-y > out/logs/queue.log 2>&1 < /dev/null & disown
cd "$(dirname "$0")/.." || exit 1
mkdir -p out/logs
# leftover bundles from renders killed by a restart (each holds a copy of every video)
rm -rf /tmp/remotion-webpack-bundle-*
for e in "$@"; do
  # FORCE=<tag>: re-render even if the mp4 exists (e.g. after a change that affects every chapter);
  # out/done-<tag>/<ep> marks the ones already redone, so the queue can be re-run after a restart.
  if [ -n "$FORCE" ]; then
    [ -f "out/done-$FORCE/$e" ] && { echo "SKIP $e (done)"; continue; }
  else
    [ -f "public/episodes/$e-3d.mp4" ] && { echo "SKIP $e"; continue; }
  fi
  for try in 1 2; do
    echo "START $e try $try $(date)"
    if npm run render -- "$e" 3d >> "out/logs/$e.log" 2>&1; then
      echo "DONE $e $(date)"
      [ -n "$FORCE" ] && mkdir -p "out/done-$FORCE" && touch "out/done-$FORCE/$e"
      break
    fi
    echo "FAIL $e try $try $(date)"
  done
done
echo ALLDONE
