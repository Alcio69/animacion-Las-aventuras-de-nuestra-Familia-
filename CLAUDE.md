# Las Aventuras de Nuestra Familia — guía para Claude

Serie infantil animada 100% con código: **Remotion (React/SVG)** para video, **Next.js** para la web (Vercel importa `main`).
Personajes: `papa` (labrador), `mama` (gata negra), `hijo` (labrador 10), `hija` (gata naranja 7). Idioma: español neutro (tú).

## Hacer un capítulo nuevo (flujo estándar)
1. Copiar `src/episodes/ep01-la-torta-sorpresa/` → `src/episodes/epNN-slug/script.ts`. Editar SOLO datos (formato en `src/engine/script.ts`).
2. Registrar en `src/episodes/index.ts`.
3. `pip install -r requirements.txt` (1ª vez por sesión) → `npm run voices` (TTS offline; solo líneas nuevas; actualiza `src/voices.json` + `public/voices/`).
4. Revisar fotogramas: `node scripts/still.mjs epNN-slug 100,400,900 out/stills` y mirar los PNG.
5. `npm run render -- epNN-slug` → `public/episodes/epNN-slug.mp4` + `.jpg` (miniatura YouTube).
6. `npx tsc --noEmit && npx next build`, commit, push a la rama y a `main`.

Duración: 30 s ≈ 6–8 líneas; 2 min ≈ 25–30 líneas. Intro 3.6 s + outro 5 s se agregan solos.

## Reglas del guion (script.ts)
- Pasos en secuencia; `with: true` = en paralelo con el paso anterior (`delay` en s).
- Piso y=930, x de 0 a 1920; fuera de cámara: -250 / 2250. Separar personajes ≥250 px.
- Acciones: walk run jump wave cheer dance clap think point shrug hug hips nod shake tremble sneeze turn look hide show.
- Expresiones: neutral happy laugh excited surprised sad angry worried wink love sleepy proud.
- Props: table cake bowl flour ball balloon gift book star heart cookie plant (mesada de cocina y=562).
- Fx: hearts stars confetti flour sparkle zzz question exclaim sweat. Sfx: pop boing whoosh ding sparkle poof tada drum doorbell giggle.
- Fondos: living kitchen park(variant 'sunset') bedroom. `point` señala hacia `facing`.
- Mayúsculas sostenidas se leen bien (el TTS las pasa a minúsculas).

## Dónde tocar
- Diseño/colores/proporciones: `src/characters/design.ts`. Caras: `Face.tsx`/`Head.tsx`. Cuerpo/ropa: `Character.tsx`.
- Animación de acciones: `src/engine/animate.ts`. Timeline: `timeline.ts`. Cámara/subtítulos/intro/outro: `Episode.tsx`.
- Fondos: `src/backgrounds/Backgrounds.tsx`. Props/Fx: `src/props/Props.tsx`.
- Voces (modelo, velocidad, tono por personaje): `scripts/voices.py`. Música/SFX procedurales: `scripts/music.mjs`.
- Para cambios puntuales de un capítulo, editar solo su `script.ts` y re-renderizar ese capítulo.
