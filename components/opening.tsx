"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MARK_PATHS } from "@/components/mark";

const ORDER = [
  { index: 3, delay: 0, duration: 0.48 },
  { index: 1, delay: 0.28, duration: 0.52 },
  { index: 0, delay: 0.62, duration: 0.42 },
  { index: 2, delay: 0.92, duration: 0.62 },
];

export function Opening() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const lockupRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    const frame = requestAnimationFrame(() => {
      if (!alive) return;
      const home = pathname === "/";
      const hash = window.location.hash.length > 1;
      const seen = sessionStorage.getItem("cps-open-seen");
      const boot = document.getElementById("cps-boot");
      if (!home || reduce || hash || seen) {
        document.documentElement.removeAttribute("data-open");
        boot?.remove();
        return;
      }
      sessionStorage.setItem("cps-open-seen", "1");
      document.documentElement.dataset.open = "playing";
      boot?.remove();
      setShow(true);
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [pathname, reduce]);

  useEffect(() => {
    if (!show) return;
    const dismiss = () => finish(true);
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      dismiss();
    };
    window.addEventListener("keydown", onKey);
    const flipAt = window.setTimeout(() => finish(false), 2000);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(flipAt);
    };
    // finish is stable enough for this one-shot timeline
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  function finish(immediate: boolean) {
    const root = rootRef.current;
    const lockup = lockupRef.current;
    const slot = document.querySelector("[data-logo-slot]");
    if (immediate || !root || !lockup || !slot) {
      document.documentElement.removeAttribute("data-open");
      setShow(false);
      return;
    }
    const from = lockup.getBoundingClientRect();
    const to = slot.getBoundingClientRect();
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const scale = Math.min(to.width / from.width, to.height / from.height);
    void animate(lockup, { x: dx, y: dy, scale }, { duration: 0.4, ease: [0.16, 1, 0.3, 1] });
    void animate(root, { opacity: 0 }, { duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] });
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-open");
      setShow(false);
    }, 700);
  }

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      data-open-overlay
      aria-hidden="true"
      onClick={() => finish(true)}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-paper"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <svg viewBox="0 0 2521 3942" className="mark h-[34vh] w-auto max-h-[340px]" aria-hidden="true">
          <defs>
            {MARK_PATHS.map((d, i) => (
              <mask key={i} id={`cps-mask-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="2521" height="3942">
                <motion.path
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeWidth={720}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  initial={{ strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    delay: ORDER.find((o) => o.index === i)?.delay ?? 0,
                    duration: ORDER.find((o) => o.index === i)?.duration ?? 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </mask>
            ))}
          </defs>
          {MARK_PATHS.map((d, i) => (
            <path key={i} d={d} fill={i === 2 ? "var(--gold)" : "currentColor"} mask={`url(#cps-mask-${i})`} />
          ))}
        </svg>
        <div ref={lockupRef} className="mt-8 origin-top-left">
          <div className="flex items-center justify-center gap-4">
            {"CARY".split("").map((ch, i) => (
              <motion.span
                key={ch}
                className="text-[13px] font-semibold tracking-[0.22em]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.38 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-2 text-[9px] tracking-[0.28em] text-muted"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.58, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            PLASTIC SURGERY
          </motion.div>
        </div>
        <motion.p
          className="mt-6 max-w-md font-serif text-2xl italic leading-snug text-ink"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 1.68, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          Sculpting Beauty with a Personal Touch.
        </motion.p>
      </div>
    </div>
  );
}
