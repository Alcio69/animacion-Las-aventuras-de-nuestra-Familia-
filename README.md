# 🐶🐱 Las Aventuras de Nuestra Familia

Serie animada infantil hecha **100 % con código**: los personajes son vectores (SVG + React) animados con
[Remotion](https://www.remotion.dev), las voces se generan offline con voces neuronales Piper y la música
es procedural (sin derechos de terceros). La web es Next.js y se publica en Vercel.

**¿Por qué código y no IA de video?** Cada capítulo es un guion corto en texto. Corregir algo
("que Hija salte más alto", "cambiá esta frase") es editar una línea y volver a renderizar: barato, rápido y
los personajes son SIEMPRE idénticos.

## Estructura

```
src/characters/   Personajes (diseño, caras, cuerpo, 12 expresiones)
src/engine/       Motor: guion → timeline → animación, cámara, subtítulos, intro/outro, miniatura
src/backgrounds/  Escenarios: living, cocina, parque, dormitorio
src/props/        Objetos (torta, globos, regalos…) y efectos (corazones, confeti, harina…)
src/episodes/     ⭐ Un guion por capítulo (lo único que se edita para hacer capítulos nuevos)
scripts/          voices.py (voces), music.mjs (música/SFX), render.mjs (MP4), still.mjs (fotogramas)
public/episodes/  Videos MP4 finales + miniaturas para YouTube
app/              Sitio web (Next.js)
```

## Ejemplo de guion

```ts
{ say: 'hija', text: '¡Papá! ¡Hoy es el cumpleaños de mamá!', expr: 'excited', act: 'jump' },
{ do: 'walk', who: 'mama', to: 2250 },               // Mamá sale caminando
{ do: 'cheer', who: ['papa', 'hijo'], with: true },  // en paralelo
{ fx: 'confetti', x: 960, y: 300 }, { sfx: 'tada', with: true },
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Web local en http://localhost:3000 |
| `npm run studio` | Remotion Studio (editor visual de la animación) |
| `pip install -r requirements.txt && npm run voices` | Genera las voces nuevas |
| `npm run music` | Regenera música y efectos |
| `npm run render` | Renderiza todos los capítulos a MP4 + miniatura |

## Publicar en Vercel
Importar el repo en Vercel (framework: Next.js, sin configuración extra). Cada capítulo queda en
`/capitulo/<id>` con reproductor, botón de descarga del MP4, miniatura y título/descripción/etiquetas listos para copiar a YouTube.

## Licencias
- Remotion es gratis para personas y empresas de hasta 3 empleados ([licencia](https://www.remotion.dev/license)).
- Voces Piper (es_MX claude/ald, es_AR daniela) y fuente Fredoka (OFL) permiten uso comercial.
- Música y efectos: generados por `scripts/music.mjs`, propios.
