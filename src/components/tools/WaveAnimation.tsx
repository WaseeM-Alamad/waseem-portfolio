import { useEffect, useRef, useState } from "react";
import "@/styles/waveAnimation.css";
import { useLocale } from "next-intl";

interface WaveAnimationProps {
  text: string;
  color?: string;
  fontSize?: number;
  style?: object
}

export default function WaveAnimation({
  text,
  fontSize = 16,
  color = "var(--color-text-primary)",
  style,
}: WaveAnimationProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [waveWidth, setWaveWidth] = useState(0);
  const [tileCount, setTileCount] = useState(20);
  const locale = useLocale();

  const scale = fontSize / 16;
  const WAVE_WIDTH = Math.round(20 * scale);
  const WAVE_HEIGHT = Math.round(7 * scale);
  const STROKE_WIDTH = Math.round(3.5 * scale);

  useEffect(() => {
    const update = () => {
      if (!textRef.current) return;
      const width = textRef.current.offsetWidth;
      setWaveWidth(width);
      setTileCount(Math.ceil(width / WAVE_WIDTH) + 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [WAVE_WIDTH]);

  return (
    <span className="wave-wrapper">
      <p
        ref={textRef}
        className="wave-text"
        style={{ fontSize: `${fontSize}px`, ...style }}
      >
        {text}
      </p>
      <div
        className="wave-container"
        style={{
          width: waveWidth,
          ["--wave-width" as string]: `${WAVE_WIDTH}px`,
        }}
      >
        <div className={locale === "en" ? "wave-track" : "wave-track-rtl"}>
          {Array.from({ length: tileCount }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 144 46"
              width={WAVE_WIDTH}
              height={WAVE_HEIGHT}
              className="wave-tile"
            >
              <path
                d="M0,13c36.1,0,36.1,19.8,72.3,19.8s36.1-19.8,72.3-19.8"
                fill="none"
                stroke={color}
                strokeWidth={STROKE_WIDTH}
              />
            </svg>
          ))}
        </div>
      </div>
    </span>
  );
}
