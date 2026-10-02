/** FNV-1a hash, shared by the voice generator (Node) and the renderer (browser). */
export const voiceKey = (speaker: string, text: string): string => {
  let h = 0x811c9dc5;
  const s = `${speaker}|${text.trim()}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${speaker}-${h.toString(16).padStart(8, '0')}`;
};
