import React from 'react';
import type { Background } from '../engine/script';

/** All backgrounds are 1920x1080 SVG groups. `t` = seconds, for subtle ambient motion. */
export const BackgroundView: React.FC<{ bg: Background; variant?: string; t: number }> = ({ bg, variant, t }) => {
  switch (bg) {
    case 'kitchen':
      return <Kitchen t={t} />;
    case 'park':
      return <Park t={t} variant={variant} />;
    case 'bedroom':
      return <Bedroom t={t} />;
    default:
      return <Living t={t} />;
  }
};

const Cloud: React.FC<{ x: number; y: number; s?: number; o?: number }> = ({ x, y, s = 1, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={o}>
    <ellipse cx={0} cy={0} rx={70} ry={34} />
    <circle cx={-34} cy={-14} r={32} />
    <circle cx={14} cy={-30} r={40} />
    <circle cx={52} cy={-8} r={28} />
  </g>
);

const SkyWindow: React.FC<{ x: number; y: number; w: number; h: number; t: number; night?: boolean; curtains?: string }> = ({ x, y, w, h, t, night, curtains }) => {
  const id = `win${x}${y}`;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? '#1B2550' : '#7CC4F2'} />
          <stop offset="100%" stopColor={night ? '#3B3F7A' : '#CDEBFF'} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x={x} y={y} width={w} height={h} rx={10} />
        </clipPath>
      </defs>
      <rect x={x - 18} y={y - 18} width={w + 36} height={h + 36} rx={18} fill="#FFFFFF" stroke="#E5D3BE" strokeWidth={4} />
      <rect x={x} y={y} width={w} height={h} rx={10} fill={`url(#${id}-sky)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {night ? (
          <>
            <circle cx={x + w * 0.72} cy={y + h * 0.3} r={42} fill="#FFF4C2" />
            <circle cx={x + w * 0.72 + 18} cy={y + h * 0.3 - 10} r={38} fill="#2A3166" />
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={i} cx={x + ((i * 97) % w)} cy={y + ((i * 53) % (h * 0.8))} r={2 + (i % 3)} fill="#FFF" opacity={0.5 + 0.5 * Math.sin(t * 2 + i)} />
            ))}
          </>
        ) : (
          <>
            <Cloud x={x + ((t * 12 + w * 0.3) % (w + 200)) - 60} y={y + h * 0.3} s={0.8} />
            <Cloud x={x + ((t * 7 + w * 0.8) % (w + 200)) - 80} y={y + h * 0.62} s={0.55} o={0.9} />
            <path d={`M ${x} ${y + h} Q ${x + w * 0.3} ${y + h * 0.7} ${x + w * 0.6} ${y + h * 0.85} T ${x + w} ${y + h * 0.78} L ${x + w} ${y + h} Z`} fill="#9BD37A" />
          </>
        )}
      </g>
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#FFFFFF" strokeWidth={14} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#FFFFFF" strokeWidth={14} />
      <rect x={x - 30} y={y + h + 14} width={w + 60} height={18} rx={8} fill="#F4E6D4" stroke="#E5D3BE" strokeWidth={3} />
      {curtains && (
        <g fill={curtains}>
          <path d={`M ${x - 60} ${y - 40} L ${x + w * 0.18} ${y - 40} Q ${x + w * 0.08} ${y + h * 0.5} ${x + w * 0.02} ${y + h + 30} L ${x - 60} ${y + h + 30} Z`} />
          <path d={`M ${x + w + 60} ${y - 40} L ${x + w * 0.82} ${y - 40} Q ${x + w * 0.92} ${y + h * 0.5} ${x + w * 0.98} ${y + h + 30} L ${x + w + 60} ${y + h + 30} Z`} />
          <rect x={x - 80} y={y - 52} width={w + 160} height={16} rx={8} fill="#B08968" />
        </g>
      )}
    </g>
  );
};

const Plant: React.FC<{ x: number; y: number; s?: number; t: number }> = ({ x, y, s = 1, t }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-40, -15, 10, 35, -60, 55].map((a, i) => (
      <ellipse
        key={i}
        cx={0}
        cy={-90}
        rx={22}
        ry={70}
        fill={i % 2 ? '#4E9F5A' : '#66B86F'}
        transform={`rotate(${a + Math.sin(t * 1.2 + i) * 2} 0 0)`}
      />
    ))}
    <path d="M -55 -10 L 55 -10 L 42 70 L -42 70 Z" fill="#E07A5F" stroke="#B85C44" strokeWidth={4} />
    <rect x={-62} y={-22} width={124} height={22} rx={8} fill="#EE8D72" stroke="#B85C44" strokeWidth={4} />
  </g>
);

const Frame: React.FC<{ x: number; y: number; w: number; h: number; color: string; children?: React.ReactNode }> = ({ x, y, w, h, color, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-6} y={-6} width={w + 12} height={h + 12} rx={8} fill="#C08552" />
    <rect width={w} height={h} rx={4} fill={color} />
    {children}
  </g>
);

const WoodFloor: React.FC<{ y: number; c1?: string; c2?: string }> = ({ y, c1 = '#DDA16B', c2 = '#C78550' }) => (
  <g>
    <defs>
      <linearGradient id="woodfloor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c2} />
        <stop offset="100%" stopColor={c1} />
      </linearGradient>
    </defs>
    <rect x={0} y={y} width={1920} height={1080 - y} fill="url(#woodfloor)" />
    {Array.from({ length: 8 }).map((_, r) => {
      const yy = y + Math.pow(r / 8, 1.4) * (1080 - y);
      return (
        <g key={r}>
          <line x1={0} x2={1920} y1={yy} y2={yy} stroke="#A9693C" strokeWidth={2} opacity={0.35} />
          {Array.from({ length: 6 }).map((__, c) => (
            <line key={c} x1={((c * 360 + r * 170) % 2100) - 90} x2={((c * 360 + r * 170) % 2100) - 90} y1={yy} y2={y + Math.pow((r + 1) / 8, 1.4) * (1080 - y)} stroke="#A9693C" strokeWidth={2} opacity={0.3} />
          ))}
        </g>
      );
    })}
  </g>
);

const Living: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <defs>
      <linearGradient id="lv-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF1DD" />
        <stop offset="100%" stopColor="#F8DDBF" />
      </linearGradient>
      <radialGradient id="lv-lamp" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF3B0" stopOpacity={0.7} />
        <stop offset="100%" stopColor="#FFF3B0" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#lv-wall)" />
    {/* wallpaper dots */}
    {Array.from({ length: 60 }).map((_, i) => (
      <circle key={i} cx={(i % 12) * 170 + ((Math.floor(i / 12) % 2) * 85) + 40} cy={Math.floor(i / 12) * 110 + 50} r={5} fill="#F2C9A0" opacity={0.5} />
    ))}
    <rect x={0} y={560} width={1920} height={150} fill="#F3CDA3" />
    {Array.from({ length: 13 }).map((_, i) => (
      <rect key={i} x={i * 150 + 20} y={580} width={110} height={110} rx={6} fill="none" stroke="#E2B386" strokeWidth={3} />
    ))}
    <rect x={0} y={552} width={1920} height={14} fill="#E9BC8E" />
    <SkyWindow x={150} y={150} w={360} h={330} t={t} curtains="#C9A7E8" />
    <Frame x={740} y={170} w={150} h={120} color="#BDE0FE">
      <circle cx={75} cy={60} r={30} fill="#FFD166" />
    </Frame>
    <Frame x={930} y={140} w={130} h={170} color="#FFD6E0">
      <path d="M 65 120 C 10 80 30 40 65 70 C 100 40 120 80 65 120 Z" fill="#F0426B" />
    </Frame>
    <Frame x={1100} y={190} w={120} h={100} color="#CDEAC0">
      <g fill="#8B5E3C">
        <ellipse cx={60} cy={62} rx={18} ry={14} />
        <circle cx={40} cy={40} r={8} />
        <circle cx={55} cy={32} r={8} />
        <circle cx={70} cy={32} r={8} />
        <circle cx={83} cy={42} r={8} />
      </g>
    </Frame>
    <WoodFloor y={700} />
    {/* sofa */}
    <g transform="translate(1260 470)">
      <rect x={0} y={60} width={560} height={200} rx={50} fill="#4FB0A5" stroke="#2F7F76" strokeWidth={5} />
      <rect x={30} y={0} width={500} height={150} rx={45} fill="#5CC2B6" stroke="#2F7F76" strokeWidth={5} />
      <rect x={-20} y={90} width={90} height={180} rx={40} fill="#5CC2B6" stroke="#2F7F76" strokeWidth={5} />
      <rect x={490} y={90} width={90} height={180} rx={40} fill="#5CC2B6" stroke="#2F7F76" strokeWidth={5} />
      <rect x={80} y={50} width={130} height={100} rx={30} fill="#FFD166" stroke="#D9A93D" strokeWidth={4} transform="rotate(-8 145 100)" />
      <rect x={350} y={50} width={130} height={100} rx={30} fill="#F497B6" stroke="#CF6F91" strokeWidth={4} transform="rotate(7 415 100)" />
      <rect x={40} y={262} width={20} height={30} fill="#7A5235" />
      <rect x={500} y={262} width={20} height={30} fill="#7A5235" />
    </g>
    {/* lamp */}
    <ellipse cx={1150} cy={360} rx={190} ry={190} fill="url(#lv-lamp)" opacity={0.8 + Math.sin(t * 3) * 0.05} />
    <g transform="translate(1150 300)">
      <path d="M -60 0 L 60 0 L 38 -80 L -38 -80 Z" fill="#FFE8A3" stroke="#E0B95A" strokeWidth={4} />
      <rect x={-5} y={0} width={10} height={420} fill="#8C6A4F" />
      <ellipse cx={0} cy={420} rx={50} ry={12} fill="#8C6A4F" />
    </g>
    <Plant x={620} y={690} s={0.9} t={t} />
    {/* rug */}
    <ellipse cx={960} cy={930} rx={700} ry={95} fill="#8EC5E8" />
    <ellipse cx={960} cy={930} rx={650} ry={78} fill="none" stroke="#FFFFFF" strokeWidth={6} strokeDasharray="20 16" opacity={0.7} />
  </g>
);

const Kitchen: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <defs>
      <linearGradient id="kt-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E9F7F1" />
        <stop offset="100%" stopColor="#D5EFE5" />
      </linearGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#kt-wall)" />
    {/* backsplash tiles */}
    {Array.from({ length: 4 }).map((_, r) =>
      Array.from({ length: 24 }).map((__, c) => (
        <rect key={`${r}-${c}`} x={c * 80 + (r % 2) * 40 - 40} y={420 + r * 38} width={76} height={34} rx={4} fill="#FFFFFF" opacity={0.7} />
      )),
    )}
    {/* upper cabinets */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${60 + i * 210} 70)`}>
        <rect width={190} height={250} rx={14} fill="#FFF8EC" stroke="#D9C7A8" strokeWidth={4} />
        <rect x={18} y={18} width={154} height={214} rx={10} fill="none" stroke="#E8D9BD" strokeWidth={3} />
        <rect x={150} y={200} width={14} height={30} rx={6} fill="#B08968" />
      </g>
    ))}
    {[0, 1].map((i) => (
      <g key={i} transform={`translate(${1220 + i * 190} 70)`}>
        <rect width={170} height={250} rx={14} fill="#FFF8EC" stroke="#D9C7A8" strokeWidth={4} />
        <rect x={18} y={18} width={134} height={214} rx={10} fill="none" stroke="#E8D9BD" strokeWidth={3} />
        <rect x={10} y={200} width={14} height={30} rx={6} fill="#B08968" />
      </g>
    ))}
    <SkyWindow x={760} y={110} w={380} h={260} t={t} curtains="#F7B2BD" />
    {/* hanging utensils */}
    <rect x={700} y={395} width={500} height={8} rx={4} fill="#B08968" />
    {[760, 860, 1050, 1140].map((x, i) => (
      <g key={x} transform={`rotate(${Math.sin(t * 1.5 + i) * 2} ${x} 400)`}>
        <line x1={x} y1={400} x2={x} y2={450} stroke="#8D99AE" strokeWidth={6} />
        {i % 2 ? <circle cx={x} cy={470} r={22} fill="#8D99AE" /> : <ellipse cx={x} cy={470} rx={14} ry={24} fill="#EF8354" />}
      </g>
    ))}
    {/* counter */}
    <rect x={0} y={590} width={1560} height={210} fill="#9FD3C3" stroke="#6BAF9C" strokeWidth={4} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={20 + i * 255} y={612} width={230} height={170} rx={12} fill="#AEDCCD" stroke="#6BAF9C" strokeWidth={3} />
        <rect x={115 + i * 255} y={630} width={40} height={10} rx={5} fill="#5E8C7E" />
      </g>
    ))}
    <rect x={0} y={556} width={1580} height={40} rx={10} fill="#E6C9A8" stroke="#C4A27E" strokeWidth={4} />
    {/* stove */}
    <rect x={300} y={540} width={260} height={18} rx={6} fill="#4A4E69" />
    {/* fridge */}
    <g transform="translate(1600 210)">
      <rect width={280} height={590} rx={30} fill="#F8F9FA" stroke="#CED4DA" strokeWidth={5} />
      <line x1={0} y1={220} x2={280} y2={220} stroke="#CED4DA" strokeWidth={5} />
      <rect x={30} y={120} width={16} height={80} rx={8} fill="#ADB5BD" />
      <rect x={30} y={250} width={16} height={110} rx={8} fill="#ADB5BD" />
      {/* kid drawings */}
      <rect x={90} y={280} width={120} height={90} fill="#FFF3BF" transform="rotate(-5 150 325)" />
      <circle cx={150} cy={320} r={24} fill="#FFA94D" />
      <rect x={110} y={400} width={110} height={80} fill="#D0EBFF" transform="rotate(6 165 440)" />
      <path d="M 140 440 L 165 415 L 190 440 Z" fill="#E64980" />
      <circle cx={150} cy={60} r={14} fill="#F03E3E" />
      <circle cx={200} cy={80} r={14} fill="#37B24D" />
    </g>
    {/* checker floor */}
    <rect x={0} y={800} width={1920} height={280} fill="#F1E3D3" />
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 16 }).map((__, c) =>
        (r + c) % 2 ? (
          <rect key={`${r}${c}`} x={c * 125 - (r * 10)} y={800 + r * 56} width={125} height={56} fill="#E3CDB6" />
        ) : null,
      ),
    )}
  </g>
);

const Tree: React.FC<{ x: number; y: number; s?: number; t: number; c?: string }> = ({ x, y, s = 1, t, c = '#5BAA4A' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -22 0 L -14 -170 L 14 -170 L 22 0 Z" fill="#8B5E3C" />
    <g transform={`rotate(${Math.sin(t * 0.9 + x) * 1.5} 0 -170)`}>
      <circle cx={0} cy={-250} r={110} fill={c} />
      <circle cx={-80} cy={-190} r={80} fill={c} />
      <circle cx={85} cy={-195} r={78} fill={c} />
      <circle cx={-30} cy={-290} r={60} fill="#fff" opacity={0.12} />
    </g>
  </g>
);

const Park: React.FC<{ t: number; variant?: string }> = ({ t, variant }) => {
  const sunset = variant === 'sunset';
  return (
    <g>
      <defs>
        <linearGradient id="pk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sunset ? '#FF9E7A' : '#6EC3F5'} />
          <stop offset="100%" stopColor={sunset ? '#FFE3A3' : '#D7F0FF'} />
        </linearGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#pk-sky)" />
      <circle cx={1600} cy={170} r={90} fill={sunset ? '#FFB347' : '#FFE066'} />
      <circle cx={1600} cy={170} r={130} fill={sunset ? '#FFB347' : '#FFE066'} opacity={0.25} />
      <Cloud x={((t * 15 + 300) % 2300) - 200} y={170} s={1.2} />
      <Cloud x={((t * 9 + 1200) % 2300) - 200} y={110} s={0.8} o={0.9} />
      <Cloud x={((t * 11 + 1900) % 2300) - 200} y={260} s={0.9} o={0.85} />
      <path d="M 0 620 Q 400 470 900 600 T 1920 560 L 1920 1080 L 0 1080 Z" fill="#9ED37F" />
      <path d="M 0 700 Q 500 600 1100 690 T 1920 660 L 1920 1080 L 0 1080 Z" fill="#7CC161" />
      <Tree x={240} y={720} s={1.1} t={t} />
      <Tree x={1500} y={700} s={0.9} t={t} c="#4F9D44" />
      <Tree x={1780} y={740} s={1.2} t={t} />
      <rect x={0} y={760} width={1920} height={320} fill="#6DB553" />
      <path d="M 700 1080 Q 900 900 960 760 L 1080 760 Q 1120 900 1400 1080 Z" fill="#E9D5A8" />
      {/* flowers */}
      {Array.from({ length: 18 }).map((_, i) => {
        const fx = (i * 211) % 1920;
        const fy = 800 + ((i * 67) % 250);
        if (fx > 650 && fx < 1450) return null;
        const col = ['#FF6B9A', '#FFD43B', '#FFFFFF', '#B197FC'][i % 4];
        return (
          <g key={i} transform={`translate(${fx} ${fy}) rotate(${Math.sin(t * 2 + i) * 6})`}>
            <line x1={0} y1={0} x2={0} y2={-24} stroke="#3F8F3A" strokeWidth={4} />
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 9} cy={-28 + Math.sin((a * Math.PI) / 180) * 9} r={7} fill={col} />
            ))}
            <circle cx={0} cy={-28} r={5} fill="#F59F00" />
          </g>
        );
      })}
    </g>
  );
};

const Bedroom: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <defs>
      <linearGradient id="bd-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3D3B78" />
        <stop offset="100%" stopColor="#5A4E9C" />
      </linearGradient>
      <radialGradient id="bd-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE8A3" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#FFE8A3" stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={1920} height={1080} fill="url(#bd-wall)" />
    {Array.from({ length: 30 }).map((_, i) => (
      <path
        key={i}
        transform={`translate(${(i * 137) % 1920} ${(i * 71) % 520 + 30}) scale(${0.5 + (i % 3) * 0.2})`}
        d="M 0 -12 L 3 -3 L 12 0 L 3 3 L 0 12 L -3 3 L -12 0 L -3 -3 Z"
        fill="#FFF3BF"
        opacity={0.35 + 0.35 * Math.sin(t * 2 + i)}
      />
    ))}
    <SkyWindow x={1300} y={150} w={360} h={320} t={t} night curtains="#7B6FD0" />
    <WoodFloor y={720} c1="#8C6A8F" c2="#6F5378" />
    {/* bed */}
    <g transform="translate(140 520)">
      <rect x={0} y={0} width={60} height={300} rx={20} fill="#C08552" />
      <rect x={40} y={140} width={620} height={130} rx={30} fill="#FFFFFF" />
      <rect x={40} y={160} width={620} height={140} rx={30} fill="#74C0FC" />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={110 + i * 100} cy={230} r={14} fill="#FFFFFF" opacity={0.7} />
      ))}
      <rect x={70} y={100} width={150} height={70} rx={30} fill="#FFF0F6" />
      <rect x={640} y={90} width={50} height={230} rx={20} fill="#C08552" />
    </g>
    {/* night light */}
    <circle cx={1000} cy={640} r={200} fill="url(#bd-glow)" />
    <g transform="translate(1000 640)">
      <circle r={40} fill="#FFE8A3" />
      <circle cx={10} cy={-8} r={34} fill="#5A4E9C" opacity={0.25} />
      <rect x={-50} y={36} width={100} height={60} rx={10} fill="#9775FA" />
    </g>
  </g>
);
