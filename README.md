# 🐶🐱 Las Aventuras de Nuestra Familia

Serie animada infantil hecha **100 % con código** con [Remotion](https://www.remotion.dev). Cada capítulo sale en
**dos estilos a partir del mismo guion**:

- **🧸 3D** — personajes y escenarios 3D reales (Three.js) con luces suaves, sombras y materiales tipo peluche.
- **🎨 2.5D** — estilo vectorial con sombreado volumétrico, vista 3/4 y profundidad de campo.

El movimiento usa un motor de "animación natural": resortes con inercia, anticipación, peso, rodillas,
giros 3/4, gestos automáticos al hablar y oyentes que reaccionan. Voces neuronales Piper offline y música
procedural (sin derechos de terceros). La web es Next.js y se publica en Vercel.

**¿Por qué código y no IA de video?** Cada capítulo es un guion corto en texto. Corregir algo
("que Hija salte más alto", "cambiá esta frase") es editar una línea y volver a renderizar: barato, rápido y
los personajes son SIEMPRE idénticos.

## Estructura

```
src/characters/   Personajes 2.5D (diseño, caras, cuerpo, 12 expresiones)
src/three/        Versión 3D: personajes, escenarios, objetos, luces
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
| `npm run render` | Renderiza todos los capítulos (3D y 2.5D) a MP4 + miniaturas |
| `npm run render -- <id> 3d` | Renderiza solo la versión 3D de un capítulo |

## Publicar en Vercel
Importar el repo en Vercel (framework: Next.js, sin configuración extra). Cada capítulo queda en
`/capitulo/<id>` con reproductor, botón de descarga del MP4, miniatura y título/descripción/etiquetas listos para copiar a YouTube.

## Licencias
- Remotion es gratis para personas y empresas de hasta 3 empleados ([licencia](https://www.remotion.dev/license)).
- Voces Piper (es_MX claude/ald, es_AR daniela) y fuente Fredoka (OFL) permiten uso comercial.
- Música y efectos: generados por `scripts/music.mjs`, propios.
