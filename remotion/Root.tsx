import React from 'react';
import { Composition } from 'remotion';
import { CharacterSheet } from '../src/engine/CharacterSheet';
import { EpisodeVideo } from '../src/engine/Episode';
import { Thumbnail } from '../src/engine/Thumbnail';
import { FPS, compileEpisode } from '../src/engine/timeline';
import { EPISODES } from '../src/episodes';

export const RemotionRoot: React.FC = () => (
  <>
    {EPISODES.map((ep) => (
      <React.Fragment key={ep.id}>
        <Composition
          id={ep.id}
          component={EpisodeVideo}
          durationInFrames={compileEpisode(ep).totalFrames}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ episode: ep, audio: true }}
        />
        <Composition id={`${ep.id}-thumb`} component={Thumbnail} durationInFrames={1} fps={FPS} width={1280} height={720} defaultProps={{ episode: ep }} />
      </React.Fragment>
    ))}
    <Composition id="personajes" component={CharacterSheet} durationInFrames={90} fps={FPS} width={1920} height={1080} />
  </>
);
