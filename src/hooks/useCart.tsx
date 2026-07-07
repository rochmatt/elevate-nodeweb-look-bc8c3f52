import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  suffix?: string;
  kind: "package" | "addon";
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, "qty">) => CartItem;
  removeItem: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "nodekpt.cart.items";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addItem = useCallback<CartContextValue["addItem"]>(
    (item) => {
      let saved: CartItem = { ...item, qty: 1 };
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        const next = existing
          ? prev.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
            )
          : [...prev, saved];
        saved = next.find((i) => i.id === item.id) ?? saved;
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
      return saved;
    },
    [],
  );

  const removeItem = useCallback(
    (id: string) => {
      persist(items.filter((i) => i.id !== id));
    },
    [items, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      addItem,
      removeItem,
      clear,
    }),
    [items, addItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
