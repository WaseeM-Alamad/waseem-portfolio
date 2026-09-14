"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollMessageProps = {
  words?: string[];
  length?: number;
  rtl?: boolean;
  className?: string;
};

type ShapeKind =
  | "circle"
  | "pill"
  | "star"
  | "half"
  | "ring"
  | "triangle"
  | "squiggle"
  | "zigzag"
  | "plus"
  | "flower"
  | "arch";

type FloatingShape = {
  kind: ShapeKind;
  x: number;
  from: number;
  to: number;
  rotate: number;
  size: number;
  color: string;
  front?: boolean;
};

const INK = "#262626";

const SHAPES: FloatingShape[] = [
  { kind: "circle", x: 14, from: 80, to: -80, rotate: -8, size: 1.1, color: "#1E90FF" },
  { kind: "star", x: 86, from: 105, to: -95, rotate: 45, size: 1.1, color: "#FFE500" },
  { kind: "squiggle", x: 36, from: 140, to: -70, rotate: 12, size: 0.9, color: INK, front: true },
  { kind: "half", x: 64, from: 165, to: -85, rotate: -30, size: 0.95, color: "#8A86F7" },
  { kind: "triangle", x: 22, from: 210, to: -60, rotate: 40, size: 0.9, color: "#FF6B5B" },
  { kind: "zigzag", x: 78, from: 235, to: -75, rotate: -10, size: 0.85, color: "#16D5C0", front: true },
  { kind: "ring", x: 50, from: 280, to: -90, rotate: 0, size: 0.9, color: "#1E90FF" },
  { kind: "plus", x: 12, from: 300, to: -50, rotate: 45, size: 0.6, color: "#8A86F7" },
  { kind: "flower", x: 86, from: 320, to: -60, rotate: 60, size: 0.8, color: "#F2185A", front: true },
  { kind: "pill", x: 30, from: 250, to: -70, rotate: -35, size: 0.8, color: "#FFE500" },
  { kind: "arch", x: 70, from: 300, to: -65, rotate: 20, size: 0.75, color: "#F2185A" },
  { kind: "circle", x: 56, from: 340, to: -45, rotate: 0, size: 0.3, color: "#FF6B5B", front: true },
];

type WordMotion = {
  from: number;
  to: number;
  tiltIn: number;
  tiltOut: number;
  pivot: "left" | "center" | "right";
};

const WORD_MOTION: WordMotion[] = [
  { from: 70, to: -70, tiltIn: -20, tiltOut: 8, pivot: "left" },
  { from: 95, to: -85, tiltIn: 16, tiltOut: -10, pivot: "right" },
  { from: 85, to: -95, tiltIn: -12, tiltOut: 12, pivot: "center" },
];

const SETTLE_AT = 0.45;
const LEAVE_AT = 0.7;
const SETTLE_STAGGER = 0.05;
const LEAVE_STAGGER = 0.03;

function ShapeSvg({ kind, color }: { kind: ShapeKind; color: string }) {
  let body: ReactNode;

  switch (kind) {
    case "circle":
      body = <circle cx="50" cy="50" r="50" fill={color} />;
      break;
    case "pill":
      body = <rect x="0" y="30" width="100" height="40" rx="20" fill={color} />;
      break;
    case "star":
      body = (
        <path
          d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0 Z"
          fill={color}
        />
      );
      break;
    case "half":
      body = <path d="M0 75 A50 50 0 0 1 100 75 Z" fill={color} />;
      break;
    case "ring":
      body = <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="16" />;
      break;
    case "triangle":
      body = (
        <path d="M50 8 L94 88 L6 88 Z" fill={color} stroke={color} strokeWidth="10" strokeLinejoin="round" />
      );
      break;
    case "squiggle":
      body = (
        <path
          d="M4 50 Q16 26 28 50 T52 50 T76 50 T100 50"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />
      );
      break;
    case "zigzag":
      body = (
        <path
          d="M4 66 L22 34 L40 66 L58 34 L76 66 L96 34"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
      break;
    case "plus":
      body = (
        <path
          d="M36 4 H64 V36 H96 V64 H64 V96 H36 V64 H4 V36 H36 Z"
          fill={color}
          stroke={color}
          strokeWidth="8"
          strokeLinejoin="round"
        />
      );
      break;
    case "flower":
      body = (
        <>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={50 + Math.cos(angle) * 28}
                cy={50 + Math.sin(angle) * 28}
                r="20"
                fill={color}
              />
            );
          })}
          <circle cx="50" cy="50" r="30" fill={color} />
          <circle cx="50" cy="50" r="10" fill="#fff" />
        </>
      );
      break;
    case "arch":
      body = (
        <path d="M14 82 A36 36 0 0 1 86 82" fill="none" stroke={color} strokeWidth="22" strokeLinecap="round" />
      );
      break;
  }

  return (
    <svg viewBox="0 0 100 100" className="scroll-message__shape-svg" aria-hidden>
      {body}
    </svg>
  );
}

function Shape({
  shape,
  progress,
  mirrored,
}: {
  shape: FloatingShape;
  progress: MotionValue<number>;
  mirrored: boolean;
}) {
  const direction = mirrored ? -1 : 1;
  const y = useTransform(progress, [0, 1], [`${shape.from}vh`, `${shape.to}vh`]);
  const rotate = useTransform(progress, [0, 1], [shape.rotate * direction, -shape.rotate * direction]);

  const shapeVars = {
    "--shape-x": `${mirrored ? 100 - shape.x : shape.x}%`,
    "--shape-size": shape.size,
  } as CSSProperties;

  return (
    <motion.div
      aria-hidden
      className={`scroll-message__shape${shape.front ? " scroll-message__shape--front" : ""}`}
      style={{ ...shapeVars, x: "-50%", y, rotate }}
    >
      <ShapeSvg kind={shape.kind} color={shape.color} />
    </motion.div>
  );
}

function Word({
  children,
  progress,
  config,
  settle,
  leave,
  mirrored,
}: {
  children: string;
  progress: MotionValue<number>;
  config: WordMotion;
  settle: number;
  leave: number;
  mirrored: boolean;
}) {
  const direction = mirrored ? -1 : 1;
  const pivot = mirrored
    ? config.pivot === "left"
      ? "right"
      : config.pivot === "right"
        ? "left"
        : "center"
    : config.pivot;
  const keyframes = [0, settle, leave, 1];
  const y = useTransform(progress, keyframes, [`${config.from}vh`, "3vh", "-3vh", `${config.to}vh`]);
  const rotate = useTransform(progress, keyframes, [
    config.tiltIn * direction,
    0,
    0,
    config.tiltOut * direction,
  ]);
  const originX = pivot === "left" ? 0 : pivot === "right" ? 1 : 0.5;

  return (
    <motion.span className="scroll-message__word" style={{ y, rotate, originX, originY: 1 }}>
      {children}
    </motion.span>
  );
}

export default function ScrollMessage({
  words = ["My", "Projects"],
  length = 300,
  rtl = false,
  className,
}: ScrollMessageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const classes = (modifier?: string) =>
    ["scroll-message", rtl && "scroll-message--rtl", modifier, className].filter(Boolean).join(" ");

  if (reduceMotion) {
    return (
      <div className={classes("scroll-message--static")}>
        <p className="scroll-message__text">{words.join(" ")}</p>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={classes()}
      style={{ "--scroll-length": `${length}vh` } as CSSProperties}
    >
      <div className="scroll-message__stage">
        {SHAPES.map((shape, i) => (
          <Shape key={i} shape={shape} progress={scrollYProgress} mirrored={rtl} />
        ))}

        <p className="scroll-message__text">
          {words.map((word, i) => (
            <Word
              key={word + i}
              progress={scrollYProgress}
              config={WORD_MOTION[i % WORD_MOTION.length]}
              mirrored={rtl}
              settle={SETTLE_AT + i * SETTLE_STAGGER}
              leave={LEAVE_AT + i * LEAVE_STAGGER}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </div>
  );
}
