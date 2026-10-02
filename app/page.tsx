import Link from 'next/link';
import { CharacterArt, FamilyArt, LogoArt } from '../components/Art';
import { DESIGNS } from '../src/characters/design';
import type { CharId } from '../src/characters/types';
import { compileEpisode } from '../src/engine/timeline';
import { EPISODES } from '../src/episodes';

const BIO: Record<CharId, { species: string; traits: string[]; bg: string }> = {
  papa: { species: 'Perro labrador · 36 años', traits: ['Cariñoso y juguetón', 'Algo despistado', 'Le encanta pasar tiempo en familia'], bg: '#E7F1FF' },
  mama: { species: 'Gata negra · 32 años', traits: ['Inteligente y creativa', 'Paciente y observadora', 'Siempre encuentra soluciones'], bg: '#F8E8F6' },
  hijo: { species: 'Perro labrador · 10 años', traits: ['Curioso y aventurero', 'A veces se mete en problemas', 'Muy cariñoso con su hermana'], bg: '#E6F4FF' },
  hija: { species: 'Gata naranja · 7 años', traits: ['Divertida e imaginativa', 'Segura de sus ideas', 'Adora a su hermano'], bg: '#FFEBDD' },
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

export default function Home() {
  const eps = [...EPISODES].sort((a, b) => b.number - a.number);
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <LogoArt />
          <FamilyArt />
        </div>
      </section>
      <div className="wrap">
        <h2>📺 Capítulos</h2>
        <div className="grid">
          {eps.map((ep) => (
            <Link key={ep.id} href={`/capitulo/${ep.id}`} className="card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/episodes/${ep.id}-3d.jpg`} alt={ep.title} />
              <div className="body">
                <div className="num">
                  Capítulo {ep.number} · {fmt(compileEpisode(ep).totalSec)}
                </div>
                <h3>{ep.title}</h3>
                <p>{ep.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
        <h2>🐾 La familia</h2>
        <div className="chars">
          {(Object.keys(DESIGNS) as CharId[]).map((id) => (
            <div key={id} className="char" style={{ background: BIO[id].bg }}>
              <CharacterArt id={id} />
              <h3 style={{ color: DESIGNS[id].accent }}>{DESIGNS[id].name}</h3>
              <small>{BIO[id].species}</small>
              <ul>
                {BIO[id].traits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <footer>Las Aventuras de Nuestra Familia · Animación hecha con código ❤️</footer>
    </main>
  );
}
