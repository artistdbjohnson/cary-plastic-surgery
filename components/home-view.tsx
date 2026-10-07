"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Arrival } from "@/components/arrival";
import { ReviewCard } from "@/components/blocks";
import { ContactForm } from "@/components/forms";
import { FramedPortrait } from "@/components/plate";
import { CharReveal, FadeUp, LettersPullUp, MultiPull, Rise } from "@/components/motion-bits";
import { Bi, Tx, ptOf } from "@/components/tx";
import { featuredReviews, getPage, reviewSummary } from "@/lib/content";
import { headerShot } from "@/lib/media";
import { ADDRESS_LINES, AFFILIATIONS, GOOGLE_REVIEWS, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/nav";

const PILLARS = [
  { href: "/breast-plastic-surgery", label: "Breast", key: "breast-plastic-surgery" },
  { href: "/body-plastic-surgery", label: "Body", key: "body-plastic-surgery" },
  { href: "/face-plastic-surgery", label: "Face", key: "face-plastic-surgery" },
  { href: "/cosmetic-plastic-surgery", label: "Cosmetic", key: "cosmetic-plastic-surgery" },
];

const LISTEN = "Patients trust him not only for his surgical skill—but for how he listens.";
const CONTACT_LINE =
  "Whether you're exploring a change or ready to take the next step, we're here to support you with care, transparency, and confidence.";

export function HomeView() {
  const page = getPage("home")!;
  const services = page.sections.find((s) => s.kind === "index-services");
  const doctor = page.sections.find((s) => s.kind === "index-doctor");
  const trusted = page.sections.find((s) => s.kind === "index-trusted");
  const h2 = services?.blocks.find((b) => b.t === "h2")?.text || "";
  const h3 = services?.blocks.find((b) => b.t === "h3")?.text || "";
  const consult = services?.blocks.find((b) => b.t === "p")?.text || "$50 New Patient\nConsultation";
  const docName = doctor?.blocks.find((b) => b.t === "h2")?.text || "Dr. Donald P. Hanna";
  const docSub = doctor?.blocks.find((b) => b.t === "h3")?.text || "Board-Certified, Patient-Focused";
  const bio = doctor?.blocks.find((b) => b.t === "p")?.text || "";
  const before = bio.includes(LISTEN) ? bio.replace(LISTEN, "").trim() : bio;
  const trustH = trusted?.blocks.find((b) => b.t === "h2")?.text || "";
  const trustP = trusted?.blocks.find((b) => b.t === "p")?.text || "";
  const why = getPage("why-cary-plastic-surgery")!;
  const facility = why.sections.find((s) => (s.kind || "").includes("state-of-the-art"));
  const facilityHeading = facility?.blocks.find((b) => b.t === "h2")?.text || "State-of-the-Art Facility";
  const facilityParas = (facility?.blocks || []).filter((b) => b.t === "p" && b.text).map((b) => b.text as string);
  const reviews = featuredReviews.home || [];
  const hero = page.header.h1 || "Sculpting Beauty with a Personal Touch.";

  return (
    <>
      <section className="px-4 pb-4 pt-0 md:px-6 md:pb-6">
        <div data-hero-frame className="relative overflow-hidden rounded-2xl md:rounded-[2rem]">
          <HeroMedia />
          <div className="noise-overlay absolute inset-0" />
          <div className="hero-grade absolute inset-0" />
          <div className="relative z-10 flex min-h-[calc(100svh-2rem)] flex-col justify-end p-5 md:min-h-[calc(100svh-3rem)] md:p-10 lg:p-12">
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="order-2 lg:order-1 lg:col-span-8">
                <LettersPullUp
                  text="CARY"
                  className="block max-w-full font-semibold leading-[0.8] tracking-[-0.07em] text-ink text-[22vw] md:text-[20vw] lg:text-[16vw] xl:text-[20vw]"
                />
                <span className="sr-only">Cary</span>
              </div>
              <FadeUp delay={0.5} className="order-1 lg:order-2 lg:col-span-4">
                <h1 className="font-serif text-[1.85rem] italic leading-[1.15] md:text-4xl">
                  <span className="lang-en">{hero}</span>
                  <span className="lang-pt">{ptOf(hero)}</span>
                </h1>
                <Link
                  href="/request-appointment"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm text-paper transition-[gap] hover:gap-4"
                >
                  <Tx text="Book Your Consultation Today!" />
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform group-hover:scale-110">
                    <Arrow />
                  </span>
                </Link>
                <div className="mt-6 flex items-center gap-4">
                  <Image src="/media/logo/maggy-award.png" alt="The Maggy Awards Best Plastic Surgery" width={84} height={84} className="h-16 w-auto" />
                  <p className="text-sm leading-snug">
                    <Tx text="Voted BEST Plastic Surgery" />
                    <br />
                    <Tx text="in Cary, North Carolina for 7 Years!" />
                  </p>
                </div>
              </FadeUp>
            </div>
            <p className="mt-5 flex items-center gap-3 text-muted">
              <span className="gold-line w-6" />
              <span className="caps">
                <Bi en="MODEL" pt="MODELO" />
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <p className="caps mb-3 text-muted">Cary, NC</p>
          <h2 id="services" className="max-w-3xl text-3xl font-medium leading-tight md:text-5xl">
            <Tx text={h2} />
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-2xl italic text-ink">
            <Tx text={h3} />
          </p>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <Rise className="md:col-span-2 xl:col-span-2 xl:row-span-2">
              <FilmCard />
            </Rise>
            {PILLARS.map((pillar, i) => (
              <Rise key={pillar.href} delay={0.15 * (i + 1)}>
                <Pillar href={pillar.href} label={pillar.label} pageKey={pillar.key} />
              </Rise>
            ))}
          </div>
          <Rise delay={0.15} className="mt-3">
            <Link href="/before-after-gallery" className="group grid overflow-hidden bg-paper-2 md:grid-cols-2">
              <div className="relative min-h-[240px]">
                <Image src="/media/plates/gallery-mirror.jpg" alt="Gallery" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col justify-end p-8">
                <p className="caps text-muted">
                  <Bi en="GALLERY" pt="GALERIA" />
                </p>
                <p className="mt-3 text-3xl font-medium">
                  <Tx text="Before / After Gallery" />
                </p>
              </div>
            </Link>
          </Rise>
        </div>
      </section>

      <section className="px-4 md:px-6">
        <div className="shell overflow-hidden rounded-2xl bg-paper-2 md:rounded-[2rem]">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px]">
              <Image src="/media/plates/consult-desk.jpg" alt="Consultation desk" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="caps mb-4 text-muted">
                <Bi en="THE CONSULT" pt="A CONSULTA" />
              </p>
              <h2 id="consultation" className="whitespace-pre-line text-4xl font-medium leading-tight md:text-5xl">
                <Tx text={consult} />
              </h2>
              <Link href="/request-appointment" className="mt-8 inline-flex w-fit rounded-full bg-ink px-5 py-3 text-sm text-paper">
                <Tx text="Book Now" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="shell">
          <div className="bg-paper-2 px-6 py-12 md:px-12 md:py-16">
            <p className="caps mb-6 text-muted">
              <Bi en="THE SURGEON" pt="O CIRURGIÃO" />
            </p>
            <div id="dr-hanna" className="max-w-4xl text-4xl leading-[0.95] md:text-6xl">
              <MultiPull
                className="lang-en"
                parts={[
                  { text: docName + "," },
                  { text: "Board-Certified," },
                  { text: "Patient-Focused", className: "font-serif italic font-normal" },
                ]}
              />
              <h2 className="lang-pt font-medium">
                <span>{ptOf(docName)}, </span>
                <span className="font-serif font-normal italic">{ptOf(docSub)}</span>
              </h2>
            </div>
            <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p>
                  <Tx text={before} />
                </p>
                <CharReveal className="lang-en mt-6 text-2xl leading-snug md:text-3xl" text={LISTEN} />
                <CharReveal className="lang-pt mt-6 text-2xl leading-snug md:text-3xl" text={ptOf(LISTEN)} />
                <Link href="/meet-dr-hanna" className="mt-8 inline-flex text-sm prose-link">
                  <Tx text="Meet Dr. Hanna" />
                </Link>
              </div>
              <div className="flex flex-wrap items-end gap-6 lg:col-span-5">
                <FramedPortrait />
                <figure className="min-w-[180px] flex-1">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src="/media/portraits/surgeon-at-work-bw.jpg" alt="Dr. Donald P. Hanna in surgery" fill sizes="320px" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 caps text-muted">
                    <Bi en="THE OPERATING ROOM" pt="O BLOCO OPERATÓRIO" />
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="shell">
          <h2 className="max-w-4xl text-3xl font-medium leading-tight md:text-4xl">
            <TrustedLine text={trustH} />
          </h2>
          <p className="mt-6 max-w-3xl">
            <Tx text={trustP} />
          </p>
          <ul className="mt-10 flex flex-wrap items-center gap-6">
            {AFFILIATIONS.map((item) => (
              <li key={item.name}>
                <Image src={item.src} alt={item.name} width={120} height={48} className="affil h-12 w-auto object-contain px-2" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <h2 id="reviews" className="text-3xl font-medium md:text-4xl">
              <Tx text="What Our Patients Are Saying" />
            </h2>
            <p className="mt-4 text-2xl font-medium">
              <Tx text={reviewSummary} />
            </p>
            {reviews[0] ? <ReviewCard review={reviews[0]} photo /> : null}
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {reviews.slice(1, 4).map((review) => (
                <ReviewCard key={review.name + review.date} review={review} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm">
              <Link href="/patient-testimonials" className="prose-link">
                <Tx text="Patient Testimonials" />
              </Link>
              <a href={GOOGLE_REVIEWS} className="prose-link" target="_blank" rel="noopener noreferrer">
                <Tx text="View all reviews on Google" />
              </a>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/media/plates/reviews-stilllife.jpg" alt="Practice still life" fill sizes="40vw" className="object-cover" />
            </div>
            <p className="mt-3 caps text-muted">
              <Bi en="THE PRACTICE" pt="A CLÍNICA" />
            </p>
          </div>
        </div>
      </section>

      <Arrival id="arrival" heading={facilityHeading} paragraphs={facilityParas} />

      <section className="section-pad">
        <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h2 id="contact" className="text-3xl font-medium md:text-4xl">
              <Tx text="Contact Us" />
            </h2>
            <p className="mt-4">
              <Tx text={CONTACT_LINE} />
            </p>
            <div className="mt-8 text-sm">
              <p>Cary Plastic Surgery</p>
              {ADDRESS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="mt-3">
                <a className="prose-link" href={PHONE_TEL}>
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className="caps mt-6 text-muted">
                <Tx text="Location & Hours" />
              </p>
              <dl className="mt-3 space-y-1">
                {HOURS.map((row) => (
                  <div key={row.day} className="grid grid-cols-[8.5rem_1fr]">
                    <dt>
                      <Tx text={row.day} />
                    </dt>
                    <dd className="text-muted">
                      <Tx text={row.time} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4">
                <a className="prose-link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <Tx text="View Interactive Map" />
                </a>
              </p>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function TrustedLine({ text }: { text: string }) {
  const pt = ptOf(text);
  const enTail = "your way.";
  const ptTail = "à sua maneira.";
  return (
    <>
      <span className="lang-en">
        {text.endsWith(enTail) ? (
          <>
            {text.slice(0, -enTail.length)}
            <em className="font-serif font-normal italic">your way</em>.
          </>
        ) : (
          text
        )}
      </span>
      <span className="lang-pt">
        {pt.endsWith(ptTail) ? (
          <>
            {pt.slice(0, -ptTail.length)}
            <em className="font-serif font-normal italic">à sua maneira</em>.
          </>
        ) : (
          pt
        )}
      </span>
    </>
  );
}

function HeroMedia() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      initial={reduce ? false : { scale: 1.04 }}
      animate={{ scale: 1 }}
      transition={{ duration: 14, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src="/media/plates/hero-atelier.jpg"
        alt="Model in ivory silk beside an arched window in a plaster atelier"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "20% 28%" }}
      />
    </motion.div>
  );
}

function FilmCard() {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.45 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    if (inView) void video.play().catch(() => undefined);
    else video.pause();
  }, [inView, reduce]);
  return (
    <div ref={wrap} className="relative min-h-[320px] overflow-hidden bg-ink xl:min-h-full xl:h-full">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/media/video/practice-film-poster.jpg"
        muted
        playsInline
        loop
        preload="metadata"
      >
        <source src="/media/video/practice-film-1080.mp4" media="(min-width: 768px)" />
        <source src="/media/video/practice-film-720.mp4" />
      </video>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 text-paper">
        <span className="gold-line w-6" />
        <span className="caps">
          <Bi en="MODEL" pt="MODELO" />
        </span>
      </div>
    </div>
  );
}

function Pillar({ href, label, pageKey }: { href: string; label: string; pageKey: string }) {
  const shot = headerShot(pageKey);
  return (
    <Link href={href} className="group block bg-paper-2">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.altEn}
          fill
          sizes="(min-width: 1280px) 22vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: shot.position }}
        />
      </div>
      <div className="border-t border-gold px-4 py-4">
        <p className="text-2xl font-medium">
          <Tx text={label} />
        </p>
        <p className="mt-2 caps text-muted">
          <Bi en={shot.captionEn} pt={shot.captionPt} />
        </p>
      </div>
    </Link>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
