"use client";

import LocomotiveScroll from "locomotive-scroll";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
}

interface SmoothScrollContextType {
  scrollTo: (
    target: string | HTMLElement | number,
    options?: ScrollToOptions,
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll>(null);

  useEffect(() => {
    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      locomotiveScrollRef.current = new LocomotiveScroll({
        lenisOptions: {
          duration: 1.2,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        },
      });
    };

    initScroll();

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: ScrollToOptions,
  ) => {
    if (!locomotiveScrollRef.current) return;

    const lenis = locomotiveScrollRef.current.lenisInstance;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.5,
        easing:
          options?.easing ??
          ((t: number) =>
            t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
        immediate: options?.immediate ?? false,
        force: false,
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      <div ref={scrollRef}>{children}</div>
    </SmoothScrollContext.Provider>
  );
}
