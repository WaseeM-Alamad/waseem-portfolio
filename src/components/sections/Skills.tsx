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
      id: "fe",
      title: t("frontendEngineering"),
      image: "/frontend.svg",
      color: "#ff705c",
      icon: LayoutGrid,
      list: 6,
    },
    {
      id: "be",
      title: t("backendAndData"),
      image: "/backend.svg",
      color: "#8ed462",
      icon: Database,
      list: 6,
    },
    {
      id: "md",
      title: t("mobiledevelopment"),
      image: "/mobile.svg",
      color: "#ebc1ff",
      icon: Smartphone,
      list: 5,
    },
    {
      id: "ep",
      title: t("engineeringprinciples"),
      image: "/engineering.svg",
      color: "#f5e211",
      icon: Shapes,
      list: 6,
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".colored-card");
      if (!cards.length) return;

      // ScrollTrigger.normalizeScroll(true);

      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: `top-=${cards.length * GAP} top`,
      });

      cards.forEach((card, index) => {
        const content = card.querySelector(".card-content");
        ScrollTrigger.create({
          trigger: card,
          start: `top-=${(index + 1 + (isMobileView ? 0.5 : 0)) * GAP} top`,
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
              end: `top-=${(index + 2) * GAP * 1.15} top`,
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
              gap: "clamp(1rem, 2vw, 1.5rem)",
              alignItems: "center",
              height: "2.5rem",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                height: "100%",
                width: "clamp(0.4rem, 1vw, .6rem)",
                borderRadius: "1rem",
                backgroundColor: card.color,
              }}
            />
            <span
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                whiteSpace: "nowrap",
              }}
            >
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
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              marginTop: "clamp(1.2rem, 3vw, 2rem)",
              paddingInlineStart: "clamp(1rem, 4vw, 2rem)",
              flex: "1",
            }}
          >
            <div style={{ marginBottom: "auto" }}>
              {Array.from({ length: card.list }).map((_, i) => {
                const text = t(`${card.id}_${i + 1}`);
                return (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: ".4rem",
                      gap: ".8rem",
                    }}
                  >
                    <svg
                      style={{ flexShrink: 0 }}
                      width="10"
                      height="10"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z"
                        fill={card.color}
                      />
                    </svg>
                    <span className="skill-point">{text}</span>
                  </div>
                );
              })}
            </div>
            <Image
              className={`skill-img ${card.image.includes("frontend") ? undefined : "lang-flip"}`}
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
