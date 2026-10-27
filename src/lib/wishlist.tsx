"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// İstədiklərim: a plain list of picks kept in localStorage. No prices, no totals.
export type WishInput = { kind: "product"; id: string } | { kind: "gift"; value: number };
export type WishItem = WishInput & { qty: number };

const KEY = "glow.istediklerim.v1";

export const itemKey = (i: WishInput) => (i.kind === "product" ? `p:${i.id}` : `g:${i.value}`);

type Ctx = {
  items: WishItem[];
  ready: boolean;
  count: number;
  has: (key: string) => boolean;
  add: (item: WishInput) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
};

const WishlistContext = createContext<Ctx | null>(null);

function read(): WishItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(read());
    setReady(true);
    const onStorage = (e: StorageEvent) => e.key === KEY && setItems(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // private mode or full storage: the list just won't survive a reload
    }
  }, [items, ready]);

  const has = useCallback((key: string) => items.some((i) => itemKey(i) === key), [items]);

  const add = useCallback((item: WishInput) => {
    setItems((prev) => {
      const key = itemKey(item);
      if (prev.some((i) => itemKey(i) === key)) {
        return prev.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => prev.map((i) => (itemKey(i) === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== key));
  }, []);

  const value = useMemo(
    () => ({ items, ready, count: items.reduce((n, i) => n + i.qty, 0), has, add, setQty, remove }),
    [items, ready, has, add, setQty, remove],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
