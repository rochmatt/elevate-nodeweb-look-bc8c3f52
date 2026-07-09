import * as React from "react";

type Lang = "id" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (id: string, fallback?: string) => string;
}

const STORAGE_KEY = "nodekpt-lang";

const translations: Record<Lang, Record<string, string>> = {
  id: {
    home: "Home",
    market: "Market",
    chat: "Chat",
    cart: "Cart",
    me: "Me",
    login: "Log in",
    marketplace: "Marketplace",
    tools: "Tools",
    features: "Features",
    becomeSeller: "Become a Seller",
    vps: "VPS",
    bareMetal: "Bare Metal",
    proxy: "Proxy",
    language: "Bahasa",
    chooseLanguage: "Pilih bahasa",
    indonesian: "Bahasa Indonesia",
    english: "English",
    tapToOpen: "Ketuk untuk buka",
  },
  en: {
    home: "Home",
    market: "Market",
    chat: "Chat",
    cart: "Cart",
    me: "Me",
    login: "Log in",
    marketplace: "Marketplace",
    tools: "Tools",
    features: "Features",
    becomeSeller: "Become a Seller",
    vps: "VPS",
    bareMetal: "Bare Metal",
    proxy: "Proxy",
    language: "Language",
    chooseLanguage: "Choose language",
    indonesian: "Bahasa Indonesia",
    english: "English",
    tapToOpen: "Tap to open",
  },
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "id";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "id" || stored === "en") return stored;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  return browser === "en" ? "en" : "id";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("id");
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setLangState(getInitialLang());
    setHydrated(true);
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "en" ? "en" : "id";
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback(
    (id: string, fallback?: string) => {
      return translations[lang][id] ?? fallback ?? id;
    },
    [lang]
  );

  const value = React.useMemo(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function useLang(): Lang {
  return useLanguage().lang;
}
