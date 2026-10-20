# Las Aventuras de Nuestra Familia — guía para Claude

Serie infantil animada 100% con código: **Remotion** para video, **Next.js** para la web (Vercel importa `main`).
Dos estilos con el MISMO guion: **3D** (Three.js/@remotion/three, comp `epNN-slug-3d`) y **2.5D** vectorial (SVG, comp `epNN-slug`).
**El usuario eligió 3D**: renderizar solo 3D (`npm run render -- epNN-slug 3d`). Render 3D ≈ 85 min por minuto de video y el contenedor puede reiniciarse: usar la cola reanudable `setsid nohup scripts/render-queue.sh epNN-a epNN-b > out/logs/queue.log 2>&1 < /dev/null & disown` (renderiza en tramos de 8 s en `out/chunks/`; relanzarla tras un reinicio sigue donde quedó; si cambia el guion, borrar `out/chunks/epNN-slug-3d/`). La web solo lista capítulos con `-3d.mp4`. Miniatura con invitados: `thumb.cast`.
**Publicados en YouTube:** registro en `docs/publicados.md` (actualizarlo cada vez que el usuario confirma una subida; los compilados solo usan capítulos de ahí).
Personajes (id en código → nombre): `papa` = **Max** (labrador), `mama` = **Luna** (gata negra), `hijo` = **Lio** (labrador 10), `hija` = **Martina, "Tini"** (gata naranja 7). Idioma: español neutro (tú).
**Nombres:** solo Papá y Mamá pueden decirles "hijo/hija"; los hermanos se dicen "hermano/hermanita" o el nombre; cualquier otro personaje (amigos, maestra, dentista, abuela…) los llama **Lio** y **Tini**. Las etiquetas de subtítulos usan `DESIGNS[id].name`. Descripciones de YouTube y `subtitle`: usar Max, Luna, Lio y Tini. Los nombres al inicio de una frase de voz infantil se entienden peor: ponerlos al final ("Ven conmigo, Tini.").
Invitados (solo aparecen si están en `cast`): `dentista` (schnauzer), `lola` (gatita amiga de Hija), `tomi` (conejito, usa silla de ruedas), `benja` (beagle, compañero de Hijo) y sus papás `benjaPapa`/`benjaMama`, `abuela` (labradora mayor, mamá de Papá), `nico` (gato gris) y `mati` (perro marrón), compañeros de Hija, `maestra` (gata siamesa con anteojos), `renu` (gatita atigrada marrón) y `lari` (gatita negra con blanco, moño rojo), amigas de Tini. Para agregar otro invitado: `CharId` (types.ts), `DESIGNS` (design.ts; species dog|cat|bunny), `VOICES` (voices.py). ORDER y SEED se derivan solos; `BIO` en app/page.tsx es solo familia.
Vehículos: `cast: { tomi: { x, vehicle: 'wheelchair' } }` o `'bike'` (walk/run = rodar/pedalear). Acción `fall` = caerse y levantarse.
Disfraces: `cast: { papa: { x, costume: 'ghost' } }` (ghost witch pumpkin santa) o paso `{ costume: 'ghost' | 'none', who }` (instantáneo: sumar fx sparkle + sfx poof). Miniatura: `thumb.costumes`.

## Estrategia del canal (aplicar a TODO lo nuevo)
- **Miniatura de capítulo = estilo primer plano:** `thumb.hero: ['hija']` (1–2 protagonistas) con la EMOCIÓN DEL CONFLICTO en `thumb.exprs` (worried/sad/angry/surprised/sleepy, no todos felices), `thumb.prop` = objeto clave grande, `thumb.text` de 2–3 palabras (se parte solo en 2 líneas). Ej.: `{ bg: 'school', text: '¡NO SÉ LEER!', prop: 'book', hero: ['hija'], exprs: { hija: 'sad' } }`. Revisar con `node scripts/still.mjs epNN-slug-3d-thumb 0 out/stills/thumbs`. Cada miniatura debe verse distinta del resto de la grilla (fondo, personaje, emoción, objeto).
- **Compilados (cuentan solo capítulos publicados):** uno de 10 capítulos por semana (~10 min) y uno largo de +30 min de vez en cuando; por fecha especial, un compilado temático 1–2 semanas antes. Datos en `src/compilations.ts` (texto + etiqueta de duración); video con `node scripts/compilation.mjs <id> <ep...>`; miniatura con `node scripts/still.mjs <id>-thumb 0 out/stills/thumbs` → `public/compilados/<id>.jpg`. Título "¡Maratón! N Capítulos Seguidos …", descripción con marcas de tiempo (las imprime el script) y subtítulos .es.srt.
- **Descripciones nuevas:** cerrar con "📺 Más capítulos de Las Aventuras de Nuestra Familia en el canal. ¡Suscríbete para no perderte ninguno!" (no prometer "uno nuevo cada semana" salvo que haya calendario fijo).
- **Shorts:** uno por día (YouTube + TikTok + Reels) de capítulos ya publicados; ver sección Shorts.

## Shorts verticales (YouTube Shorts / TikTok / Reels)
Datos en `src/shorts/index.ts` (`SHORTS`): un momento fuerte de un capítulo YA PUBLICADO (~30 s), `hook` = texto grande arriba para YouTube (voz infantil), `hookParents` = gancho para TikTok/Reels dirigido a los PAPÁS (2 líneas máx., p. ej. "¿Tu hijo\nno sabe perder?"; SIEMPRE ponerlo: en TikTok un gancho infantil hace que lo traten como contenido para menores de 13 y no lo muestran), `episode` = capítulo completo (placa final). Copiar las líneas TEXTUALES del capítulo (así reutiliza las voces) y acercar a los personajes (~400 px). Componente `src/three/Short3D.tsx` (1080x1920; texto entre y≈200 y y≈1500, lejos del borde derecho).
Fotogramas: `node scripts/still.mjs short-NN-slug 20,300 out/stills/short`. Render: `node scripts/render-short.mjs short-NN-slug` → `public/shorts/short-NN-slug.{mp4,jpg}` (YouTube) + `short-NN-slug-tiktok.{mp4,jpg}` (TikTok/Reels, superpone el gancho de papás en ~2 min sin re-renderizar 3D); `node scripts/srt.mjs short-NN-slug` → `.es.srt`.

## Entregas al usuario
Textos de publicación (títulos, descripciones, etiquetas, playlist, configuración, textos para TikTok y Reels) SIEMPRE escritos en el chat, listos para copiar; NO generar archivos .txt. Enviar solo video, miniatura y .es.srt.
TikTok/Reels: público = papás; palabras clave + hashtags en la PRIMERA línea del texto (en cuentas nuevas TikTok clasifica por el texto); 4–5 hashtags de nicho (#crianza #maternidad #paternidad #crianzarespetuosa + tema), sin #parati; terminar con una pregunta a los papás; 1 video por día a la misma hora; nunca borrar y volver a subir el mismo video.

## Hacer un capítulo nuevo (flujo estándar)
1. Copiar `src/episodes/ep01-la-torta-sorpresa/` → `src/episodes/epNN-slug/script.ts`. Editar SOLO datos (formato en `src/engine/script.ts`).
2. Registrar en `src/episodes/index.ts`.
3. `pip install -r requirements.txt` (1ª vez por sesión) → `npm run voices` (TTS offline; solo líneas nuevas; actualiza `src/voices.json` + `public/voices/`).
4. Revisar fotogramas: `node scripts/still.mjs epNN-slug-3d auto:12 out/stills/epNN` → 12 fotogramas + `sheet.png` (hoja de contacto).
5. `npm run render -- epNN-slug` → `public/episodes/epNN-slug.mp4` / `epNN-slug-3d.mp4` + `.jpg` (miniaturas). `-- epNN-slug 3d` = solo 3D.
   Fotogramas 3D: `node scripts/still.mjs epNN-slug-3d 100,400 out/stills` (usa WebGL `angle`).
6. `npx tsc --noEmit && npx next build`, commit, push a la rama y a `main`.

Duración: 30 s ≈ 6–8 líneas; 2 min ≈ 25–30 líneas. Intro 3.6 s + outro 5 s se agregan solos.

## Reglas del guion (script.ts)
- Pasos en secuencia; `with: true` = en paralelo con el paso anterior (`delay` en s).
- Piso y=930, x de 0 a 1920; fuera de cámara: -250 / 2250. Separar personajes ≥250 px.
- Acciones: walk run jump wave cheer dance clap think point shrug hug hips nod shake tremble sneeze turn look hide show fall. OJO: `hide`/`show` hacen desaparecer/aparecer al personaje (no son "mostrar algo"); para mostrar las manos usar `wave` o `cheer`.
- Expresiones: neutral happy laugh excited surprised sad angry worried wink love sleepy proud.
- Props: table cake bowl flour ball balloon gift book star heart cookie plant plate broccoli teddy flashlight toothbrush toybox block car vase vaseBroken vaseFixed drawing tree glass pumpkin candy tablet timer xmasTree letter (mesada de cocina y=562; sobre la mesa / "en la mano" y=760).
- Encuadre 3D: mantener a los personajes entre x≈400 y x≈1550 (la cámara se mueve un poco y corta los bordes).
- Fx: hearts stars confetti flour sparkle zzz question exclaim sweat. Sfx: pop boing whoosh ding sparkle poof tada drum doorbell giggle thunder crash.
- Fondos: living (variant 'rain' | 'rainbow' | 'halloween' | 'christmas') kitchen park(variant 'sunset' | 'night') bedroom (noche; variant 'day') dentist school. `point` señala hacia `facing`.
- Lluvia: `variant: 'rain', ambience: 'rain'` en la escena; `{ sfx: 'thunder' }` hace relámpago + trueno.
- Mayúsculas sostenidas se leen bien (el TTS las pasa a minúsculas).
- Voces: Kokoro offline (`scripts/voices.py`). Evitar onomatopeyas y risas escritas ("Shhh", "Ja, ja"): el TTS las deletrea. Usar palabras ("¡Silencio!") + `sfx: 'giggle'` y `expr: 'laugh'`. "¡Oh, no!" sale mal: usar "¡No puede ser!". Frases de 1–2 palabras suenan peor: alargarlas. Hijo dice mal "¡Miren!" al inicio: usar "¡Vengan a ver!". Palabras extranjeras: agregarlas a `SAY` en voices.py (p. ej. Halloween → Jálouin; solo cambia el audio). "¡Sí!" o "¡Yo, yo!" sueltos al inicio salen mal: "¡Claro que sí!".
- Verificar voces con Whisper offline: `python3 scripts/asr.py public/voices/<key>.mp3` (ver scripts/voices.py; modelo sherpa-onnx-whisper-base).
- Objetos que se mueven: `{ moveProp: 'pelota', x, y, dur, arc, bounces }` (arco = pelota lanzada). y<520 = en el aire (altura real); en el parque toda altura es real. Sacudir un árbol: moveProp con arc chico y bounces.

## Movimiento natural (src/engine/animate.ts)
`targetPose` = pose deseada (acciones, idle con ruido orgánico, gestos automáticos al hablar, oyentes que asienten).
`solveCharacter` la filtra con kernels tipo resorte (cuerpo, brazos, cabeza con retraso = overlap; ojos rápidos).
`yaw` gira el cuerpo (0 frente, ±1 perfil) en vez de espejar; caminar = pasos según distancia (sin patinar), rodillas, peso.

## Dónde tocar
- Diseño/colores/proporciones: `src/characters/design.ts`. Caras: `Face.tsx`/`Head.tsx`. Cuerpo/ropa: `Character.tsx`.
- Animación de acciones: `src/engine/animate.ts`. Timeline: `timeline.ts`. Cámara/subtítulos/intro/outro: `Episode.tsx`.
- Fondos: `src/backgrounds/Backgrounds.tsx`. Props/Fx: `src/props/Props.tsx`.
- 3D: personajes `src/three/Character3D.tsx` (1 unidad = 100 px del diseño), escenarios `Sets3D.tsx`, objetos `Props3D.tsx`, luces `Lights3D.tsx`, escena/intro/outro/miniatura `Scene3D.tsx`. Coordenadas: X=(x-960)/100, Z=(y-930)/60.
- Voces (modelo, velocidad, tono por personaje): `scripts/voices.py`. Música/SFX procedurales: `scripts/music.mjs`.
- Para cambios puntuales de un capítulo, editar solo su `script.ts` y re-renderizar ese capítulo.
