import type { CharId } from './types';

/**
 * Character bible: proportions + colors. Tweak here to restyle a character everywhere.
 * Units are pixels at scale 1 (scene is 1920x1080, floor around y=930).
 */
export type Design = {
  id: CharId;
  name: string;
  species: 'dog' | 'cat';
  age: number;
  headR: number;
  eyeScale: number;
  torsoH: number;
  torsoTop: number; // shoulder width
  torsoBottom: number; // hip width
  legH: number;
  legW: number;
  armLen: number;
  armW: number;
  fur: { base: string; light: string; dark: string; muzzle: string; ear: string; stripe?: string };
  iris: string;
  irisDark: string;
  lashes: boolean;
  outfit: 'jacket' | 'sweater' | 'hoodie' | 'overalls';
  top: { base: string; dark: string; light: string };
  inner?: string; // tee under jacket / tee under overalls
  bottom: { base: string; dark: string; kind: 'jeans' | 'shorts' | 'overall-shorts' };
  shoes: { base: string; dark: string; sole: string };
  accent: string; // UI color for name tags / subtitles
  extras: Array<'backpack' | 'bow' | 'blush' | 'glasses'>;
};

export const DESIGNS: Record<CharId, Design> = {
  // Guest: the family dentist, a friendly grey schnauzer in a white coat.
  dentista: {
    id: 'dentista',
    name: 'Dentista',
    species: 'dog',
    age: 45,
    headR: 94,
    eyeScale: 0.95,
    torsoH: 178,
    torsoTop: 128,
    torsoBottom: 124,
    legH: 150,
    legW: 48,
    armLen: 166,
    armW: 38,
    fur: { base: '#A9A6A2', light: '#D2CFCA', dark: '#77736E', muzzle: '#EEEBE6', ear: '#8D8984' },
    iris: '#5B7A99',
    irisDark: '#26394D',
    lashes: false,
    outfit: 'jacket',
    top: { base: '#F8F9FA', dark: '#CED4DA', light: '#FFFFFF' },
    inner: '#8CE0D2',
    bottom: { base: '#63C7B8', dark: '#3FA394', kind: 'jeans' },
    shoes: { base: '#F5F2EA', dark: '#5F6670', sole: '#E2DCCD' },
    accent: '#12B886',
    extras: ['glasses'],
  },
  papa: {
    id: 'papa',
    name: 'Papá',
    species: 'dog',
    age: 36,
    headR: 96,
    eyeScale: 1,
    torsoH: 175,
    torsoTop: 132,
    torsoBottom: 122,
    legH: 150,
    legW: 50,
    armLen: 168,
    armW: 40,
    fur: { base: '#E9A945', light: '#F8CF83', dark: '#C1801F', muzzle: '#FCE6BC', ear: '#CF8A2E' },
    iris: '#7A4A1E',
    irisDark: '#3E220B',
    lashes: false,
    outfit: 'jacket',
    top: { base: '#55812F', dark: '#3C6120', light: '#73A045' },
    inner: '#F1E8D4',
    bottom: { base: '#2F4570', dark: '#22335A', kind: 'jeans' },
    shoes: { base: '#F5F2EA', dark: '#2E3140', sole: '#E2DCCD' },
    accent: '#2F6FD0',
    extras: [],
  },
  mama: {
    id: 'mama',
    name: 'Mamá',
    species: 'cat',
    age: 32,
    headR: 90,
    eyeScale: 1.05,
    torsoH: 168,
    torsoTop: 108,
    torsoBottom: 104,
    legH: 168,
    legW: 42,
    armLen: 160,
    armW: 34,
    fur: { base: '#2C2A33', light: '#4A4656', dark: '#18171D', muzzle: '#3D3946', ear: '#EBA3AE' },
    iris: '#C2CC3A',
    irisDark: '#6D7A12',
    lashes: true,
    outfit: 'sweater',
    top: { base: '#B89DDD', dark: '#9479C3', light: '#D2BEEE' },
    bottom: { base: '#8DAED8', dark: '#6A8DBE', kind: 'jeans' },
    shoes: { base: '#2E2D38', dark: '#1B1A22', sole: '#F2EFE8' },
    accent: '#9B59C9',
    extras: [],
  },
  hijo: {
    id: 'hijo',
    name: 'Hijo',
    species: 'dog',
    age: 10,
    headR: 88,
    eyeScale: 1.15,
    torsoH: 116,
    torsoTop: 104,
    torsoBottom: 98,
    legH: 100,
    legW: 40,
    armLen: 116,
    armW: 33,
    fur: { base: '#EFB24E', light: '#FBD58E', dark: '#C98A2A', muzzle: '#FDE9C4', ear: '#D59436' },
    iris: '#2C83C9',
    irisDark: '#123E6B',
    lashes: false,
    outfit: 'hoodie',
    top: { base: '#2F71D3', dark: '#1F55A8', light: '#5592EA' },
    bottom: { base: '#8C7D4D', dark: '#6F623A', kind: 'shorts' },
    shoes: { base: '#22355F', dark: '#16233F', sole: '#F2EFE8' },
    accent: '#2B8A3E',
    extras: ['backpack', 'blush'],
  },
  hija: {
    id: 'hija',
    name: 'Hija',
    species: 'cat',
    age: 7,
    headR: 82,
    eyeScale: 1.2,
    torsoH: 96,
    torsoTop: 86,
    torsoBottom: 86,
    legH: 86,
    legW: 32,
    armLen: 98,
    armW: 28,
    fur: { base: '#F39136', light: '#FFB868', dark: '#CF6C1C', muzzle: '#FFE6C8', ear: '#F7A9B8', stripe: '#D7681A' },
    iris: '#2FB3C4',
    irisDark: '#0F5E6B',
    lashes: true,
    outfit: 'overalls',
    top: { base: '#8C59CF', dark: '#6F41B1', light: '#A97BE3' },
    inner: '#F8BCD6',
    bottom: { base: '#8C59CF', dark: '#6F41B1', kind: 'overall-shorts' },
    shoes: { base: '#F2809F', dark: '#D65B7E', sole: '#FFFFFF' },
    accent: '#E8590C',
    extras: ['bow', 'blush'],
  },
};

/** Total height (feet to top of head) at scale 1, handy for placing props. */
export const heightOf = (id: CharId) => {
  const d = DESIGNS[id];
  return d.legH + d.torsoH + d.headR * 1.9;
};
