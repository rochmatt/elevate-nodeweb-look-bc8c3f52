import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Lightweight demo auth (client-only, localStorage-backed).
 * Swap with Lovable Cloud auth when a real backend is enabled.
 */

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
};

const STORAGE_KEY = "nodekpt.auth.user";
const AuthContext = createContext<AuthContextValue | null>(null);

const PALETTE = [
  "#0ea5a4",
  "#0284c7",
  "#7c3aed",
  "#f59e0b",
  "#ef4444",
  "#10b981",
];

function pickColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "user";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const signIn = useCallback(
    async (email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 350));
      const u: AuthUser = {
        id: crypto.randomUUID(),
        name: nameFromEmail(email),
        email,
        avatarColor: pickColor(email),
      };
      persist(u);
      return u;
    },
    [persist],
  );

  const signUp = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 400));
      const u: AuthUser = {
        id: crypto.randomUUID(),
        name: name.trim() || nameFromEmail(email),
        email,
        avatarColor: pickColor(email),
      };
      persist(u);
      return u;
    },
    [persist],
  );

  const signOut = useCallback(() => persist(null), [persist]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      ready,
      signIn,
      signUp,
      signOut,
    }),
    [user, ready, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}
