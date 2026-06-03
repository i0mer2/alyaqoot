'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.key === item.key);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.key === item.key ? { ...i, qty: i.qty + item.qty } : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, item], isOpen: true };
        }),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.price * i.qty, 0),
    }),
    { name: 'alyaqoot-cart' },
  ),
);
