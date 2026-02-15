import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const AnimatedPath = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  const locale = useLocale();
  useEffect(() => {
    if (!pathRef.current || !sectionRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength.toString();
    path.style.strokeDashoffset = pathLength.toString();

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: pathRef.current,
        start: "top 30%", // when SVG enters screen
        end: "bottom 120%", // when SVG leaves
        scrub: 0.6,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [sectionRef]);

  return (
    <div className="svg-path">
      {/* <svg
        style={{ transform: locale === "en" ? "scaleX(-1)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1944.2 6151.5"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--color-primary)"
          strokeLinecap="round"
          strokeWidth="500"
          d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808"
          id="main-path"
        ></path>
      </svg> */}

      <svg
        style={{ transform: locale === "en" ? "scaleX(-1)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1944.2 6151.5"
        id="desktop-svg"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="none"
          stroke="#8ED462"
          strokeLinecap="round"
          strokeWidth="500"
          d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808"
          id="main-path"
        ></path>{" "}
        {/* <path
          fill="none"
          stroke="#8ED462"
          stroke-linecap="round"
          stroke-width="500"
          d="M679.3 2510c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5"
          id="secondary-path"
        ></path>{" "} */}
      </svg>
    </div>
  );
};

export default AnimatedPath;
