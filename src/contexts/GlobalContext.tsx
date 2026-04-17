"use client";

import { useLocale } from "next-intl";
import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";

interface GlobalContextType {
  isMobileView: boolean;
  isAr: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
  isMobileView: false,
  isAr: false,
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const locale = useLocale();
  const isAr = locale === "ar";

  useEffect(() => {
    const handler = () => {
      setIsMobileView(window.innerWidth <= 1114);
    };

    handler();
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <GlobalContext.Provider value={{ isMobileView, isAr }}>
      {children}
    </GlobalContext.Provider>
  );
}
