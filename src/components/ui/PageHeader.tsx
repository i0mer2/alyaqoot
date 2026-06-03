'use client';

import { motion } from 'framer-motion';

export default function PageHeader({
  eyebrow, title, sub,
}: {
  eyebrow?: string; title: string; sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-center text-white">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-ruby-600/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#d0a35e 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="container-luxe relative">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-champagne-400">{eyebrow}</span>
            <span className="h-px w-8 bg-champagne" />
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-display text-4xl md:text-6xl">
          {title}
        </motion.h1>
        {sub && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mx-auto mt-4 max-w-2xl text-platinum-200">
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
