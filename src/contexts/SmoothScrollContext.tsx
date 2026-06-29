"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LocomotiveScroll from "locomotive-scroll";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";

gsap.registerPlugin(ScrollTrigger);

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
  stopScroll: () => void;
  startScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used inside provider");
  return ctx;
};

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const { isSplashPlaying } = useGlobalContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll>(null);

  useEffect(() => {
    const initScroll = async () => {
      if (isSplashPlaying) return;
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

      locomotiveScrollRef.current.lenisInstance?.stop();

      const lenis = locomotiveScrollRef.current?.lenisInstance;
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        // gsap.ticker.add((time) => lenis.raf(time * 1000));
        // gsap.ticker.lagSmoothing(0);
      }
    };

    initScroll();

    return () => {
      locomotiveScrollRef.current?.destroy();
      gsap.ticker.remove((time) =>
        locomotiveScrollRef.current?.lenisInstance?.raf(time * 1000),
      );
    };
  }, [isSplashPlaying]);

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

  const stopScroll = () => {
    locomotiveScrollRef.current?.lenisInstance?.stop();
  };

  const startScroll = () => {
    locomotiveScrollRef.current?.lenisInstance?.start();
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, startScroll, stopScroll }}>
      <div ref={scrollRef}>{children}</div>
    </SmoothScrollContext.Provider>
  );
}
