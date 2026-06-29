"use client";

import { useLocale } from "next-intl";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useLayoutEffect,
} from "react";

interface GlobalContextType {
  isMobileView: boolean;
  isAr: boolean;
  isSplashPlaying: boolean;
  setIsSplashPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType>({
  isMobileView: false,
  isAr: false,
  isSplashPlaying: true,
  setIsSplashPlaying: ()=> {},
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSplashPlaying, setIsSplashPlaying] = useState(true);
  const locale = useLocale();
  const isAr = locale === "ar";

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const handler = () => {
      setIsMobileView(window.innerWidth <= 1114);
    };

    handler();
    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  useLayoutEffect(() => {
    if (isSplashPlaying) {
      document.documentElement.setAttribute("data-splash-playing", "1");
      return;
    }
    window.dispatchEvent(new CustomEvent("page-transition-complete"));
    document.documentElement.removeAttribute("data-splash-playing");
  }, [isSplashPlaying]);

  return (
    <GlobalContext.Provider value={{ isMobileView, isAr, isSplashPlaying, setIsSplashPlaying }}>
      {children}
    </GlobalContext.Provider>
  );
}
