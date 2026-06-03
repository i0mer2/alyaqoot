'use client';

import Reveal from './Reveal';

export default function SectionTitle({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-champagne" />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-champagne-600">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-champagne" />
        </div>
      )}
      <h2 className="font-display text-3xl leading-tight text-ink md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-ink-muted md:text-lg">{sub}</p>}
    </Reveal>
  );
}
