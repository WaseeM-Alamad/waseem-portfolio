import { ReactNode, useEffect, useRef, Children, isValidElement } from "react";
import { gsap } from "gsap";

export const StandingText = ({
  children,
  once = false,
}: {
  children: ReactNode;
  once?: boolean | false;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimatedRef.current && once) {
          observer.disconnect();
          return;
        }
        const entry = entries[0];
        if (entry.isIntersecting) {
          const words = containerRef.current!.querySelectorAll(".word-inner");

          gsap.set(words, {
            rotationX: 90,
            transformOrigin: "center bottom",
            opacity: 0,
          });

          gsap.to(words, {
            rotationX: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
          });
        }
        hasAnimatedRef.current = true;
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [hasAnimatedRef]);

  const wrapWord = (word: string, index: number) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        perspective: "1000px",
        marginRight: "0.25em",
      }}
    >
      <span
        className="word-inner"
        style={{
          display: "inline-block",
          willChange: "transform",
        }}
      >
        {word}
      </span>
    </span>
  );

  const splitIntoWords = (content: ReactNode): ReactNode[] => {
    const result: ReactNode[] = [];
    let wordIndex = 0;

    Children.forEach(content, (child) => {
      if (typeof child === "string") {
        child.split(" ").forEach((word) => {
          if (word) result.push(wrapWord(word, wordIndex++));
        });
      } else if (isValidElement(child)) {
        result.push(
          <span
            key={wordIndex++}
            style={{
              display: "inline-block",
              perspective: "1000px",
              marginRight: "0.25em",
            }}
          >
            <span
              className="word-inner"
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {child}
            </span>
          </span>,
        );
      }
    });

    return result;
  };

  return <div ref={containerRef}>{splitIntoWords(children)}</div>;
};
