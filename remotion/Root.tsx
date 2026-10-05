import React from 'react';
import { Composition } from 'remotion';
import { Test3D } from '../src/three/Test3D';
import { Guests3D } from '../src/three/Guests3D';
import { CharacterSheet } from '../src/engine/CharacterSheet';
import { EpisodeVideo } from '../src/engine/Episode';
import { Thumbnail } from '../src/engine/Thumbnail';
import { Thumbnail3D } from '../src/three/Scene3D';
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
          defaultProps={{ episode: ep, audio: true, style: '2d' as const }}
        />
        <Composition
          id={`${ep.id}-3d`}
          component={EpisodeVideo}
          durationInFrames={compileEpisode(ep).totalFrames}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ episode: ep, audio: true, style: '3d' as const }}
        />
        <Composition id={`${ep.id}-thumb`} component={Thumbnail} durationInFrames={1} fps={FPS} width={1280} height={720} defaultProps={{ episode: ep }} />
        <Composition id={`${ep.id}-3d-thumb`} component={Thumbnail3D} durationInFrames={1} fps={FPS} width={1280} height={720} defaultProps={{ episode: ep }} />
      </React.Fragment>
    ))}
    <Composition id="personajes-3d" component={Test3D} durationInFrames={90} fps={FPS} width={1920} height={1080} />
    <Composition id="invitados-3d" component={Guests3D} durationInFrames={90} fps={FPS} width={1920} height={1080} />
    <Composition id="personajes" component={CharacterSheet} durationInFrames={90} fps={FPS} width={1920} height={1080} />
  </>
);
