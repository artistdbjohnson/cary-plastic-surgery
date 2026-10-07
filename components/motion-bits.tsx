"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function LettersPullUp({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduce = useReducedMotion();
  return (
    <span ref={ref} className={className} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={`${ch}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "22%" }}
            animate={reduce || inView ? { y: "0%" } : { y: "22%" }}
            transition={{ delay: reduce ? 0 : i * 0.08, duration: 0.9, ease: EASE }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      animate={reduce || inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Letter({
  ch,
  i,
  total,
  progress,
  reduce,
}: {
  ch: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = i / total - 0.1;
  const end = i / total + 0.05;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  if (reduce || ch === " ") return <span>{ch}</span>;
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}

export function CharReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.3"] });
  const chars = Array.from(text);
  return (
    <p ref={ref} className={className}>
      {chars.map((ch, i) => (
        <Letter key={`${i}-${ch}`} ch={ch} i={i} total={chars.length} progress={scrollYProgress} reduce={!!reduce} />
      ))}
    </p>
  );
}

export function MultiPull({ parts, className = "" }: { parts: { text: string; className?: string }[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const words = parts.flatMap((part, pi) =>
    part.text.split(" ").filter(Boolean).map((word, wi, arr) => ({
      word,
      className: part.className,
      key: `${pi}-${wi}-${word}`,
      space: wi < arr.length - 1 || pi < parts.length - 1,
    })),
  );
  return (
    <h2 ref={ref} className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((w, i) => (
        <span key={w.key} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${w.className ?? ""}`}
            initial={reduce ? false : { y: "24%" }}
            animate={reduce || inView ? { y: "0%" } : { y: "24%" }}
            transition={{ delay: reduce ? 0 : i * 0.08, duration: 0.75, ease: EASE }}
          >
            {w.word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
