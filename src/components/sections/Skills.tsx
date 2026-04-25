import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Observer } from "gsap/all";
import { Database, LayoutGrid, Shapes, Smartphone } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGlobalContext } from "@/contexts/GlobalContext";

gsap.registerPlugin(ScrollTrigger, Observer);

const GAP = 70;

export default function StackedCards() {
  const { isMobileView } = useGlobalContext();
  const t = useTranslations("skills");
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsData = [
    {
      id: 1,
      title: t("frontendEngineering"),
      image: "/frontend.svg",
      color: "#ff705c",
      icon: LayoutGrid,
      list: [
        "React, Next.js",
        "Custom masonry layouts",
        "Drag-and-drop interactions",
        "State management & rendering control",
        "Performance optimization",
        "Responsive UI systems",
      ],
    },
    {
      id: 2,
      title: t("backendAndData"),
      image: "/backend.svg",
      color: "#8ed462",
      icon: Database,
      list: [
        "Node.js & REST APIs",
        "MongoDB schema design",
        "Supabase (Auth, Storage, Realtime)",
        "Secure data flows",
        "Optimized queries & indexing",
        "Scalable backend architecture",
      ],
    },
    {
      id: 3,
      title: t("mobiledevelopment"),
      image: "/mobile.svg",
      color: "#ebc1ff",
      icon: Smartphone,
      list: [
        "Flutter cross-platform apps",
        "Mobile UI & layout systems",
        "Local state & cart management",
        "API integration",
        "Performance-conscious mobile builds",
      ],
    },
    {
      id: 4,
      title: t("engineeringprinciples"),
      image: "/engineering.svg",
      color: "#f5e211",
      icon: Shapes,
      list: [
        "Clean architecture",
        "Modular & scalable systems",
        "Predictable data flow",
        "Maintainable codebases",
        "User-focused interaction design",
        "Performance-first mindset",
      ],
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".colored-card");
      if (!cards.length) return;

      ScrollTrigger.normalizeScroll(true);

      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center",
      });

      cards.forEach((card, index) => {
        const content = card.querySelector(".card-content");
        ScrollTrigger.create({
          trigger: card,
          start: `top-=${(index + 1 + (isMobileView ? 0.7 : 0)) * GAP} top`,
          end: () => lastCardST.start,
          pin: true,
          pinSpacing: false,
          anticipatePin: 0,
        });

        if (index < cards.length - 1) {
          gsap.to(content, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 54%",
              end: `top-=${(index + 2) * GAP * 1.05} top`,
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobileView]);

  return (
    <section id="skills" ref={containerRef}>
      {cardsData.map((card, i) => (
        <div
          key={card.id}
          className="colored-card"
          style={{
            border: i === 0 ? "none" : "",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              height: "2.5rem",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                height: "100%",
                width: ".6rem",
                borderRadius: "1rem",
                backgroundColor: card.color,
              }}
            />
            <span style={{ fontSize: "2.5rem", whiteSpace: "nowrap" }}>
              {" "}
              {card.title}
            </span>
          </div>
          <div
            className="card-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.5rem",
              marginTop: "2rem",
              paddingInlineStart: "2rem",
              flex: "1",
            }}
          >
            <div>
              {card.list.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".8rem",
                  }}
                >
                  <svg
                    style={{ flexShrink: 0 }}
                    width="10"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z"
                      fill={card.color}
                    />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Image
              className={
                card.image.includes("frontend") ? undefined : "lang-flip"
              }
              src={card.image}
              alt=""
              width={350}
              height={250}
              style={{ borderRadius: "2rem" }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
