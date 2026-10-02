'use client';

import { Player } from '@remotion/player';
import { useState } from 'react';
import { EpisodeVideo, type EpisodeStyle } from '../src/engine/Episode';
import { FPS, compileEpisode } from '../src/engine/timeline';
import { getEpisode } from '../src/episodes';

const STYLES: { id: EpisodeStyle; label: string }[] = [
  { id: '3d', label: '🧸 Versión 3D' },
  { id: '2d', label: '🎨 Versión 2.5D' },
];

/** Live in-browser playback of a chapter (same code that renders the MP4), with a style switch. */
export default function EpisodePlayer({ id }: { id: string }) {
  const episode = getEpisode(id)!;
  const { totalFrames } = compileEpisode(episode);
  const [style, setStyle] = useState<EpisodeStyle>('3d');
  const file = style === '3d' ? `${id}-3d` : id;
  return (
    <div>
      <div className="tabs">
        {STYLES.map((s) => (
          <button key={s.id} className={`tab ${style === s.id ? 'on' : ''}`} onClick={() => setStyle(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="player">
        <Player
          key={style}
          component={EpisodeVideo}
          inputProps={{ episode, audio: true, style }}
          durationInFrames={totalFrames}
          fps={FPS}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{ width: '100%', aspectRatio: '16 / 9' }}
          controls
          initialFrame={75}
          clickToPlay
          allowFullscreen
          acknowledgeRemotionLicense
        />
      </div>
      <div className="btns">
        <a className="btn" href={`/episodes/${file}.mp4`} download>
          ⬇ Descargar video {style === '3d' ? '3D' : '2.5D'} (MP4 1080p)
        </a>
        <a className="btn alt" href={`/episodes/${file}.jpg`} download>
          🖼 Descargar miniatura
        </a>
      </div>
    </div>
  );
}
