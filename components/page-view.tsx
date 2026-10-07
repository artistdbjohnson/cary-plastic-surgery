"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrival } from "@/components/arrival";
import { Blocks, MarginNote, ReviewCard, SectionIndex } from "@/components/blocks";
import { AppointmentForm, ContactForm } from "@/components/forms";
import { Plate } from "@/components/plate";
import { Tx } from "@/components/tx";
import {
  allReviews,
  anchorFor,
  featuredReviews,
  firstPersonQuote,
  getPage,
  isHubKey,
  isProcedureKey,
  liveUrl,
  reviewSummary,
  searchable,
  sectionHeading,
  stripStars,
} from "@/lib/content";
import { headerShot, procedureShot, shotFor, slugOf } from "@/lib/media";
import { ADDRESS_LINES, GALLERY_LINKS, GOOGLE_REVIEWS, GROUPS, HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/nav";
import { normalizeHref } from "@/lib/links";
import type { Block, PageData, Section } from "@/lib/types";

const CONTACT_LINE =
  "Whether you're exploring a change or ready to take the next step, we're here to support you with care, transparency, and confidence.";

export function PageView({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  if (!page) return null;
  if (pageKey === "patient-testimonials") return <Testimonials page={page} pageKey={pageKey} />;
  if (pageKey === "before-after-gallery") return <Gallery page={page} pageKey={pageKey} />;
  if (pageKey === "contact-us") return <Contact page={page} pageKey={pageKey} />;
  if (pageKey === "request-appointment") return <Appointment page={page} pageKey={pageKey} />;
  if (pageKey === "search") return <Search page={page} pageKey={pageKey} />;
  if (pageKey === "sitemap") return <SitemapPage page={page} pageKey={pageKey} />;
  return <Longform page={page} pageKey={pageKey} />;
}

function PageHero({ page, pageKey }: { page: PageData; pageKey: string }) {
  const shot = headerShot(pageKey);
  return (
    <div className="px-4 pt-4 md:px-6">
      <div data-hero-frame className="relative min-h-[460px] overflow-hidden rounded-2xl md:min-h-[560px] md:rounded-[2rem]">
        <Image
          src={shot.src}
          alt={shot.altEn}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: shot.position || "center center" }}
        />
        <div className="noise-overlay absolute inset-0" />
        <div className="hero-grade absolute inset-0" />
        <div className="relative z-10 flex min-h-[460px] flex-col justify-end p-6 md:min-h-[560px] md:p-12">
          <h1 className="max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl">
            <Tx text={page.header.h1 || ""} />
          </h1>
          {page.header.sub ? (
            <p className="mt-4 max-w-2xl text-lg">
              <Tx text={page.header.sub} />
            </p>
          ) : null}
          {page.header.bullets?.length ? (
            <ul className="mt-6 flex max-w-3xl flex-col gap-2">
              {page.header.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm">
                  <span className="gold-dot mt-2" />
                  <Tx text={bullet} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <p className="mt-3 flex items-center gap-3 text-muted">
        <span className="gold-line w-6" />
        <span className="caps">
          <span className="lang-en">{shot.captionEn}</span>
          <span className="lang-pt">{shot.captionPt}</span>
        </span>
      </p>
    </div>
  );
}

function sectionDomId(section: Section, index: number): string {
  const id = anchorFor(section.kind || "", index);
  if (id === "in-his-words" && sectionHeading(section)) return "expertise";
  return id;
}

function withoutQuote(blocks: Block[], quote: string | null, kind: string): Block[] {
  if (!quote || !kind.includes("doctor-cta")) return blocks;
  return blocks.filter((block) => {
    if (block.t !== "p" || !block.text) return true;
    return stripStars(block.text) !== quote;
  });
}

function Longform({ page, pageKey }: { page: PageData; pageKey: string }) {
  const quote = firstPersonQuote(page);
  const showMargin = Boolean(quote) && (isProcedureKey(pageKey) || pageKey === "why-cary-plastic-surgery" || pageKey === "meet-dr-hanna");
  const index = page.sections
    .map((section, i) => ({ id: sectionDomId(section, i), label: sectionHeading(section) }))
    .filter((item): item is { id: string; label: string } => Boolean(item.label));

  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-12 lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
              {showMargin && quote ? <MarginNote quote={quote} /> : <div className="hidden lg:block" />}
              <div className="hidden lg:block">
                <SectionIndex items={index} />
              </div>
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-8 lg:hidden">
              <SectionIndex items={index} />
            </div>
            {page.sections.map((section, i) => (
              <SectionBlock key={`${section.kind}-${i}`} section={section} index={i} pageKey={pageKey} quote={quote} />
            ))}
            {isProcedureKey(pageKey) ? (
              <p className="mt-12 text-sm">
                <a className="prose-link" href={liveUrl(pageKey)} target="_blank" rel="noopener noreferrer">
                  <Tx text="View on caryplasticsurgery.com" />
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function SectionBlock({
  section,
  index,
  pageKey,
  quote,
}: {
  section: Section;
  index: number;
  pageKey: string;
  quote: string | null;
}) {
  const id = sectionDomId(section, index);
  if ((section.kind || "").includes("state-of-the-art")) {
    const heading = sectionHeading(section) || "State-of-the-Art Facility";
    const paragraphs = section.blocks.filter((b) => b.t === "p" && b.text).map((b) => b.text as string);
    return <Arrival bleed id="facility" heading={heading} paragraphs={paragraphs} />;
  }
  if ((section.kind || "").includes("review")) {
    const list = featuredReviews[pageKey] || [];
    const slice = (section.kind || "").includes("interior") ? list.slice(0, 3) : list.slice(0, 1);
    return (
      <section id={id} className="mt-12">
        {sectionHeading(section) ? (
          <h2 className="mb-4 text-3xl font-medium">
            <Tx text={sectionHeading(section) || ""} />
          </h2>
        ) : null}
        {slice.map((review) => (
          <ReviewCard key={review.name + review.date} review={review} />
        ))}
      </section>
    );
  }
  const blocks = withoutQuote(section.blocks, quote, section.kind || "");
  if (!blocks.length) return null;
  const shotKind = id === "benefits" ? "benefits" : id === "procedure" ? "procedure" : id === "overview" || id === "intro" || id === "about" ? "intro" : null;
  const extra = shotKind && isProcedureKey(pageKey) ? procedureShot(slugOf(pageKey), shotKind) : null;
  const hasImg = blocks.some((b) => b.t === "img");
  const [first, ...rest] = blocks;
  return (
    <section id={id} className="mt-12">
      {first ? <Blocks blocks={[first]} /> : null}
      {extra && !hasImg ? (
        <Plate
          src={extra}
          altEn="Model, procedure series"
          altPt="Modelo, série do procedimento"
          captionEn="MODEL"
          captionPt="MODELO"
          className="my-8 max-w-xl"
          sizes="(min-width: 1024px) 36vw, 100vw"
        />
      ) : null}
      {rest.length ? <Blocks blocks={rest} /> : null}
      {(section.kind || "").includes("links") && isHubKey(pageKey) ? <HubCards hubPath={`/${pageKey}`} /> : null}
    </section>
  );
}

function HubCards({ hubPath }: { hubPath: string }) {
  const group = GROUPS.find((g) => g.href === hubPath);
  if (!group) return null;
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {group.children.map((child) => {
        const slug = child.href.split("/").pop() || "";
        const file = procedureShot(slug, "link") || procedureShot(slug, "intro") || shotFor(group.href.slice(1), "header").src;
        return (
          <Link key={child.href} href={child.href} className="group border border-line">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image src={file} alt="" fill sizes="40vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <p className="p-4 text-lg font-medium">
              <Tx text={child.label} />
            </p>
          </Link>
        );
      })}
    </div>
  );
}

function Gallery({ page, pageKey }: { page: PageData; pageKey: string }) {
  const intro = page.sections[0]?.blocks.find((b) => b.t === "p")?.text || "";
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-4">
            <p>
              <Tx text={intro} />
            </p>
            <div className="mt-12 space-y-12">
              {GALLERY_LINKS.map((group) => (
                <div key={group.group}>
                  <h2 className="text-2xl font-medium">
                    <Tx text={group.group} />
                  </h2>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                    {group.items.map((item) => {
                      const next = normalizeHref(item.href);
                      const plate =
                        group.group === "Body"
                          ? "/media/plates/pillar-body.jpg"
                          : group.group === "Face"
                            ? "/media/plates/pillar-face.jpg"
                            : group.group === "Cosmetic"
                              ? "/media/plates/pillar-cosmetic.jpg"
                              : "/media/plates/pillar-breast.jpg";
                      return (
                        <li key={item.href}>
                          <a href={next.href} target="_blank" rel="noopener noreferrer" className="group block border border-line">
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Image src={plate} alt="" fill sizes="30vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                            </div>
                            <span className="block p-4">
                              <Tx text={item.label} />
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Testimonials({ page, pageKey }: { page: PageData; pageKey: string }) {
  const years = useMemo(() => {
    const set = new Set(allReviews.map((r) => r.date.slice(-4)));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, []);
  const [year, setYear] = useState("all");
  const list = year === "all" ? allReviews : allReviews.filter((r) => r.date.endsWith(year));
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad">
        <p className="text-3xl font-medium">
          <Tx text={reviewSummary} />
        </p>
        <div className="mt-6 flex gap-2 overflow-auto" role="toolbar" aria-label="Filter reviews by year">
          <button type="button" className="chip" data-on={year === "all" ? "true" : "false"} onClick={() => setYear("all")}>
            <Tx text="All years" />
          </button>
          {years.map((y) => (
            <button key={y} type="button" className="chip" data-on={year === y ? "true" : "false"} onClick={() => setYear(y)}>
              {y}
            </button>
          ))}
        </div>
        <div className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
          {list.map((review, i) => (
            <article key={`${review.name}-${review.date}-${i}`} className="mb-6 break-inside-avoid border border-line p-5">
              <p className="caps text-muted">
                {review.date} · {review.source}
              </p>
              {review.body.map((para, j) => (
                <p key={j} className="mt-3">
                  {para}
                </p>
              ))}
              <p className="mt-4 font-medium">{review.name}</p>
              <p className="lang-pt mt-2 caps text-muted">Avaliação original em inglês</p>
            </article>
          ))}
        </div>
        <p className="mt-8">
          <a className="prose-link" href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer">
            <Tx text="View all reviews on Google" />
          </a>
        </p>
      </div>
    </>
  );
}

function Contact({ page, pageKey }: { page: PageData; pageKey: string }) {
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <p>
            <Tx text={CONTACT_LINE} />
          </p>
          <p className="mt-4">
            <a className="prose-link" href="/vcard.vcf">
              <Tx text="Load us into your address book" />
            </a>
          </p>
          <div className="mt-8">
            <p className="caps text-muted">
              <Tx text="Location & Hours" />
            </p>
            <p className="mt-3">Cary Plastic Surgery</p>
            {ADDRESS_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-3">
              <a className="prose-link" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
            </p>
            <dl className="mt-4 space-y-1 text-sm">
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
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 className="mb-6 text-2xl font-medium">
            <Tx text="Send Us A Message" />
          </h2>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

function Appointment({ page, pageKey }: { page: PageData; pageKey: string }) {
  const paras = page.sections[0]?.blocks.filter((b) => b.t === "p" && b.text).map((b) => b.text as string) || [];
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7">
          <h2 className="text-2xl font-medium">
            <Tx text="Online Appointment Request" />
          </h2>
          <div className="mt-4 space-y-4">
            {paras.map((p) => (
              <p key={p.slice(0, 24)}>
                <Tx text={p} />
              </p>
            ))}
          </div>
          <div className="mt-10">
            <AppointmentForm />
          </div>
          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-2xl font-medium">
              <Tx text="Or Call to Schedule an Appointment" />
            </h2>
            <p className="mt-4">
              <Tx text="Calling our office is a fast and convenient way to schedule an appointment. Our team will do whatever it takes to get you in at a date and time that's suitable for you." />
            </p>
            <p className="mt-3">
              <a className="prose-link" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <p className="caps text-muted">
            <Tx text="Location & Hours" />
          </p>
          <p className="mt-3">Cary Plastic Surgery</p>
          {ADDRESS_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <dl className="mt-4 space-y-1 text-sm">
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
        </div>
      </div>
    </>
  );
}

function Search({ page, pageKey }: { page: PageData; pageKey: string }) {
  const [q, setQ] = useState("");
  const results = searchable().filter((item) => {
    const hay = `${item.title} ${item.description}`.toLowerCase();
    return q.trim().length > 0 && hay.includes(q.trim().toLowerCase());
  });
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad">
        <form
          className="max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="caps text-muted" htmlFor="q">
            <Tx text="Search" />
          </label>
          <input id="q" className="field" value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="submit" className="mt-4 rounded-full bg-ink px-5 py-2 text-sm text-paper">
            <Tx text="Submit" />
          </button>
        </form>
        <ul className="mt-10 max-w-2xl">
          {results.map((item) => (
            <li key={item.href} className="border-b border-line py-4">
              <Link href={item.href} className="text-lg">
                {item.title}
              </Link>
              <p className="text-sm text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
        {q && results.length === 0 ? (
          <p className="mt-6 text-muted">
            <Tx text="No matching pages." />
          </p>
        ) : null}
      </div>
    </>
  );
}

function SitemapPage({ page, pageKey }: { page: PageData; pageKey: string }) {
  return (
    <>
      <PageHero page={page} pageKey={pageKey} />
      <div className="shell section-pad">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-4">
            <SitemapBody />
          </div>
        </div>
      </div>
    </>
  );
}

export function SitemapBody() {
  const page = getPage("sitemap");
  const items = page?.sections[0]?.blocks[0]?.items || [];
  return (
    <div className="stack-links">
      {items.map((item) => {
        const links = Array.from(item.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g));
        if (!links.length) {
          return (
            <p key={item}>
              <Tx text={item} />
            </p>
          );
        }
        return (
          <div key={item.slice(0, 40)} className="mt-6">
            {links.map((match, i) => {
              const next = normalizeHref(match[2]);
              const className = i === 0 ? "font-medium" : "pl-4 text-sm";
              if (next.external) {
                return (
                  <a key={match[2]} className={className} href={next.href} target="_blank" rel="noopener noreferrer">
                    <Tx text={match[1]} />
                  </a>
                );
              }
              return (
                <Link key={match[2]} className={className} href={next.href}>
                  <Tx text={match[1]} />
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
