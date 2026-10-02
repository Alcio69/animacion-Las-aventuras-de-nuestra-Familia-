'use client';

import { Player } from '@remotion/player';
import { EpisodeVideo } from '../src/engine/Episode';
import { FPS, compileEpisode } from '../src/engine/timeline';
import { getEpisode } from '../src/episodes';

/** Live in-browser playback of a chapter (same code that renders the MP4). */
export default function EpisodePlayer({ id }: { id: string }) {
  const episode = getEpisode(id)!;
  const { totalFrames } = compileEpisode(episode);
  return (
    <div className="player">
      <Player
        component={EpisodeVideo}
        inputProps={{ episode, audio: true }}
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
  );
}
