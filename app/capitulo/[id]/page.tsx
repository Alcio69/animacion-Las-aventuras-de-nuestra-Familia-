import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyBox from '../../../components/CopyBox';
import EpisodePlayer from '../../../components/EpisodePlayer';
import { EPISODES, getEpisode } from '../../../src/episodes';

export const dynamicParams = false;
export const generateStaticParams = () => EPISODES.map((e) => ({ id: e.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const ep = getEpisode((await params).id);
  return ep ? { title: `${ep.title} — Las Aventuras de Nuestra Familia`, description: ep.subtitle } : {};
}

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const ep = getEpisode((await params).id);
  if (!ep) notFound();
  return (
    <main className="wrap" style={{ paddingBottom: 40 }}>
      <Link href="/" className="back">
        ← Todos los capítulos
      </Link>
      <h2 style={{ marginTop: 0 }}>
        Capítulo {ep.number}: {ep.title}
      </h2>
      <EpisodePlayer id={ep.id} />
      <h2>▶ Para subir a YouTube</h2>
      <CopyBox label="Título" text={ep.youtube.title} />
      <CopyBox label="Descripción" text={ep.youtube.description} />
      <CopyBox label="Etiquetas" text={ep.youtube.tags.join(', ')} />
    </main>
  );
}
