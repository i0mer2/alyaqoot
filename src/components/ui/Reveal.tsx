'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Reveal({
  children,
  i = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  i?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const MotionTag = motion[as] as React.ElementType;
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  );
}
