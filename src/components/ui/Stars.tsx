import { Star } from 'lucide-react';

export default function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(value) ? 'fill-champagne text-champagne' : 'text-platinum-300'}
        />
      ))}
    </div>
  );
}
