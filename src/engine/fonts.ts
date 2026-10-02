import { continueRender, delayRender, staticFile } from 'remotion';

export const FONT = 'Fredoka, "Baloo 2", system-ui, sans-serif';

let started = false;

/** Loads the bundled Fredoka font (no network to Google needed at render time). */
export const ensureFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Loading Fredoka');
  Promise.all(
    [500, 600, 700].map((w) =>
      new FontFace('Fredoka', `url(${staticFile(`fonts/fredoka-latin-${w}-normal.woff2`)})`, { weight: String(w) }).load().then((f) => {
        document.fonts.add(f);
      }),
    ),
  )
    .catch(() => undefined)
    .finally(() => continueRender(handle));
};
