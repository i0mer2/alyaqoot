'use client';

import { useId } from 'react';

/** تفتيح/تغميق لون hex بنسبة amt (-1..1) */
export function shade(hex: string, amt: number): string {
  const c = hex.replace('#', '');
  const num = parseInt(c.length === 3 ? c.split('').map((x) => x + x).join('') : c, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  r = Math.round((t - r) * p) + r;
  g = Math.round((t - g) * p) + g;
  b = Math.round((t - b) * p) + b;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

type Props = {
  color: string;
  pattern?: 'plain' | 'stripe' | 'damask';
  sheer?: boolean;
  variant?: 'panel' | 'double' | 'tieback';
  className?: string;
  rounded?: boolean;
};

/**
 * رسم ستارة إجرائي بالكامل بالـSVG — بدون أي صورة خارجية.
 * يحاكي الكسرات (folds) واللمعان والنقشة، ويُستخدم كبديل أنيق قبل رفع الصور.
 */
export default function CurtainArt({
  color,
  pattern = 'plain',
  sheer = false,
  variant = 'panel',
  className,
  rounded = true,
}: Props) {
  const id = useId().replace(/:/g, '');
  const light = shade(color, 0.32);
  const dark = shade(color, -0.34);
  const mid = color;

  // كسرات: تدرّج متكرّر يحاكي طيّات القماش
  const folds = 14;
  const stops: { o: number; c: string }[] = [];
  for (let i = 0; i <= folds; i++) {
    const t = i / folds;
    stops.push({ o: t, c: i % 2 === 0 ? dark : light });
  }

  const opacity = sheer ? 0.62 : 1;

  return (
    <svg
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="curtain"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        {/* خلفية النافذة/الضوء */}
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf9f5" />
          <stop offset="100%" stopColor="#ece6da" />
        </linearGradient>

        {/* كسرات القماش */}
        <linearGradient id={`fold-${id}`} x1="0" y1="0" x2="1" y2="0">
          {stops.map((s, i) => (
            <stop key={i} offset={`${s.o * 100}%`} stopColor={s.c} />
          ))}
        </linearGradient>

        {/* لمعان علوي */}
        <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>

        {/* قضيب فضي */}
        <linearGradient id={`rod-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9e9ee" />
          <stop offset="50%" stopColor="#a9abb6" />
          <stop offset="100%" stopColor="#6f7180" />
        </linearGradient>

        {/* نقشة دمشقية */}
        <pattern id={`damask-${id}`} width="56" height="72" patternUnits="userSpaceOnUse">
          <path
            d="M28 8c10 8 16 18 0 30C12 26 18 16 28 8zM28 34c10 8 16 18 0 30C12 52 18 42 28 34z"
            fill={light}
            opacity="0.5"
          />
          <circle cx="28" cy="36" r="3" fill={light} opacity="0.5" />
        </pattern>
      </defs>

      {/* خلفية */}
      <rect width="400" height="520" fill={`url(#bg-${id})`} />
      {/* أرضية خفيفة */}
      <rect y="470" width="400" height="50" fill="#dcd5c7" opacity="0.6" />

      <g opacity={opacity}>
        {variant === 'double' ? (
          <>
            <CurtainPanel x={0} w={150} id={id} pattern={pattern} foldUrl={`url(#fold-${id})`} sheenUrl={`url(#sheen-${id})`} damaskUrl={`url(#damask-${id})`} stripe={light} tie />
            <CurtainPanel x={250} w={150} id={id} pattern={pattern} foldUrl={`url(#fold-${id})`} sheenUrl={`url(#sheen-${id})`} damaskUrl={`url(#damask-${id})`} stripe={light} tie mirror />
          </>
        ) : variant === 'tieback' ? (
          <CurtainPanel x={70} w={260} id={id} pattern={pattern} foldUrl={`url(#fold-${id})`} sheenUrl={`url(#sheen-${id})`} damaskUrl={`url(#damask-${id})`} stripe={light} tie />
        ) : (
          <CurtainPanel x={40} w={320} id={id} pattern={pattern} foldUrl={`url(#fold-${id})`} sheenUrl={`url(#sheen-${id})`} damaskUrl={`url(#damask-${id})`} stripe={light} />
        )}
      </g>

      {/* القضيب والكُرات */}
      <rect x="6" y="30" width="388" height="14" rx="7" fill={`url(#rod-${id})`} />
      <circle cx="14" cy="37" r="13" fill={`url(#rod-${id})`} />
      <circle cx="386" cy="37" r="13" fill={`url(#rod-${id})`} />
    </svg>
  );
}

function CurtainPanel({
  x, w, id, pattern, foldUrl, sheenUrl, damaskUrl, stripe, tie = false, mirror = false,
}: {
  x: number; w: number; id: string; pattern: string;
  foldUrl: string; sheenUrl: string; damaskUrl: string; stripe: string;
  tie?: boolean; mirror?: boolean;
}) {
  // شكل انسدال الستارة (أعرض من فوق، ينساب لتحت، مع ربطة جانبية اختيارية)
  const hem = tie
    ? `M${x} 40 H${x + w} V360 C${x + w} 420 ${x + w * 0.45} 430 ${x + w * 0.5} 480 C${x + w * 0.55} 430 ${x} 420 ${x} 360 Z`
    : `M${x} 40 H${x + w} V470 C${x + w * 0.75} 486 ${x + w * 0.25} 486 ${x} 470 Z`;

  return (
    <g transform={mirror ? `translate(${2 * x + w}, 0) scale(-1, 1)` : undefined}>
      <path d={hem} fill={foldUrl} />
      {pattern === 'damask' && <path d={hem} fill={damaskUrl} />}
      {pattern === 'stripe' && (
        <g opacity="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={x + 8 + (i * (w - 16)) / 9} y={44} width="2.5" height={tie ? 430 : 420} fill={stripe} />
          ))}
        </g>
      )}
      <path d={hem} fill={sheenUrl} />
      {/* رأس الكسرات */}
      <rect x={x} y={40} width={w} height={20} fill="#000" opacity="0.08" />
      {tie && (
        <ellipse cx={x + w * 0.5} cy={355} rx={w * 0.5 + 6} ry={14} fill="#000" opacity="0.12" />
      )}
    </g>
  );
}
