"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLocale } from "next-intl";

export default function AnimatedBurst({
  size = 60,
  delay = 0,
}: {
  size?: number;
  delay?: number;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const locale = useLocale();

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("path");

    gsap.fromTo(
      paths,
      {
        scaleY: 0,
        opacity: 0,
        y: 8,
        transformOrigin: "50% 100%",
      },
      {
        delay: delay,
        scaleY: 1,
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
      },
    );
  }, [delay]);

  return (
    <div
      style={{
        position: "absolute",
        top: -90,
        insetInlineEnd: -100,
        transform: locale === "ar" ? "scaleX(-1)" : "none",
      }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={(size * 148) / 169}
        viewBox="0 0 169 148"
        className="animated-burst"
      >
        <path
          d="M168.49 97.3975L75.7217 147.842L68.7227 134.009L148.978 59.6221L168.49 97.3975Z"
          fill="var(--home-comp-color)"
        />
        <path
          d="M127.905 20.9443L56.6367 119.243L40.418 110.078L81.4531 4.75586L127.905 20.9443Z"
          fill="var(--home-comp-color)"
        />
        <path
          d="M22.3496 111.633L0 109.415L9.08203 0H46.457L22.3496 111.633Z"
          fill="var(--home-comp-color)"
        />
      </svg>
    </div>
  );
}
