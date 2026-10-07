"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bi, Tx } from "@/components/tx";
import { hoursStatus } from "@/lib/hours";
import { ADDRESS_LINES, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/nav";

const FRAMES = [
  {
    src: "/media/location/building-exterior-wide.jpg",
    en: "1608 KILDAIRE FARM RD",
    pt: "1608 KILDAIRE FARM RD",
    alt: "Cary Plastic Surgery building on Kildaire Farm Road",
    wide: true,
  },
  {
    src: "/media/location/exterior-entrance.jpg",
    en: "THE ENTRANCE · 1608 KILDAIRE FARM RD",
    pt: "A ENTRADA · 1608 KILDAIRE FARM RD",
    alt: "Entrance at 1608 Kildaire Farm Road",
    wide: false,
  },
  {
    src: "/media/location/foyer.jpg",
    en: "THE FOYER · 1608 KILDAIRE FARM RD",
    pt: "O ÁTRIO DE ENTRADA · 1608 KILDAIRE FARM RD",
    alt: "Foyer at 1608 Kildaire Farm Road",
    wide: false,
  },
  {
    src: "/media/location/atrium.jpg",
    en: "THE ATRIUM · 1608 KILDAIRE FARM RD",
    pt: "O ÁTRIO · 1608 KILDAIRE FARM RD",
    alt: "Atrium at 1608 Kildaire Farm Road",
    wide: false,
  },
];

export function Arrival({
  id = "arrival",
  heading,
  paragraphs,
  bleed = false,
}: {
  id?: string;
  heading: string;
  paragraphs: string[];
  bleed?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [status, setStatus] = useState<{ en: string; pt: string } | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => {
    const el = track.current;
    const parent = el?.parentElement;
    if (!el || !parent || !desktop || reduce) return 0;
    const max = Math.max(0, el.scrollWidth - parent.clientWidth);
    return -max * v;
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const tick = () => setStatus(hoursStatus());
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={ref} className={`${bleed ? "bleed-row" : ""} lg:h-[250svh]`}>
      <div className="lg:sticky lg:top-[var(--nav-h)] lg:flex lg:h-[calc(100svh-var(--nav-h))] lg:items-start lg:overflow-hidden lg:pt-4">
        <div className="shell w-full py-16 lg:py-0">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <h2 id={id} className="max-w-xl text-3xl font-medium leading-tight md:text-5xl">
                <span className="caps mb-3 block font-normal text-muted">
                  <Bi en="1608 KILDAIRE FARM RD" pt="1608 KILDAIRE FARM RD" />
                </span>
                <Tx text={heading} />
              </h2>
              <div className="mt-6 max-w-2xl space-y-4 text-[17px]">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>
                    <Tx text={p} />
                  </p>
                ))}
              </div>
              <div className={desktop ? "mt-8 overflow-hidden" : "mt-8 -mx-4 max-w-[100vw] overflow-x-auto px-4 snap-x snap-mandatory"}>
                <motion.div ref={track} className="flex gap-4" style={desktop && !reduce ? { x } : undefined}>
                  {FRAMES.map((frame) => (
                    <figure key={frame.src} className={`snap-start shrink-0 ${frame.wide ? "w-[88vw] lg:w-[62vw]" : "w-[78vw] lg:w-[38vw]"}`}>
                      <div className={`relative overflow-hidden bg-paper-2 ${frame.wide ? "aspect-[3.4/1]" : "aspect-[4/3]"}`}>
                        <Image src={frame.src} alt={frame.alt} fill sizes="80vw" className="object-cover" />
                      </div>
                      <figcaption className="mt-3 flex items-center gap-3 text-muted">
                        <span className="gold-line w-6" />
                        <span className="caps">
                          <Bi en={frame.en} pt={frame.pt} />
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-4">
              <div className="border-t border-gold pt-5">
                {status ? (
                  <p className="flex items-center gap-3 text-sm">
                    <span className="gold-dot" />
                    <span className="lang-en">{status.en}</span>
                    <span className="lang-pt">{status.pt}</span>
                  </p>
                ) : (
                  <p className="caps text-muted">
                    <Tx text="Our Hours" />
                  </p>
                )}
                <dl className="mt-5 space-y-1 text-sm">
                  {HOURS.map((row) => (
                    <div key={row.day} className="grid grid-cols-[8.5rem_1fr] gap-2">
                      <dt>
                        <Tx text={row.day} />
                      </dt>
                      <dd className="text-muted">
                        <Tx text={row.time} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6">
                  <a className="prose-link" href={PHONE_TEL}>
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p className="mt-4">
                  <a className="prose-link text-sm" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <Tx text="Directions" />
                  </a>
                </p>
                <p className="mt-6 text-sm font-medium">
                  <Tx text="$50 New Patient Consultation" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
