"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Language, type Translations } from "@/lib/translations";

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("tr");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("rota-ai-theme") as "light" | "dark" | null;
    const savedLang = localStorage.getItem("rota-ai-lang") as Language | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("rota-ai-theme", newTheme);
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("rota-ai-lang", newLang);
  };

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang: handleSetLang, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
