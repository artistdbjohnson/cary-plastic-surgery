"use client";

import Image from "next/image";
import { Tx } from "@/components/tx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Block, FeaturedReview } from "@/lib/types";
import { srcFromLegacy } from "@/lib/media";
import { FramedPortrait, Plate } from "@/components/plate";

function isFaqList(items: string[]): boolean {
  return items.filter((item) => item.startsWith("**")).length >= 2;
}

function faqPair(item: string): { q: string; a: string } | null {
  const match = item.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
  if (!match) return null;
  return { q: match[1], a: match[2] };
}

export function Blocks({ blocks, anchor }: { blocks: Block[]; anchor?: string }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} anchor={i === 0 ? anchor : undefined} />
      ))}
    </div>
  );
}

function BlockView({ block, anchor }: { block: Block; anchor?: string }) {
  if (block.t === "h2" && block.text) {
    return (
      <h2 id={anchor} className="text-3xl font-medium leading-tight md:text-4xl">
        <Tx text={block.text} />
      </h2>
    );
  }
  if (block.t === "h3" && block.text) {
    return (
      <h3 id={anchor} className="pt-4 text-xl font-medium">
        <Tx text={block.text} />
      </h3>
    );
  }
  if (block.t === "p" && block.text) {
    return (
      <p>
        <Tx text={block.text} />
      </p>
    );
  }
  if ((block.t === "ul" || block.t === "ol") && block.items) {
    if (block.t === "ul" && isFaqList(block.items)) {
      return <Faq items={block.items} />;
    }
    const Tag = block.t === "ol" ? "ol" : "ul";
    return (
      <Tag className={block.t === "ol" ? "list-decimal space-y-3 pl-5" : "space-y-3"}>
        {block.items.map((item, i) => (
          <li key={i} className={block.t === "ul" ? "flex gap-3" : undefined}>
            {block.t === "ul" ? <span className="gold-dot mt-2.5" /> : null}
            <span>
              <Tx text={item} />
            </span>
          </li>
        ))}
      </Tag>
    );
  }
  if (block.t === "table" && block.rows) {
    return <DataTable rows={block.rows} />;
  }
  if (block.t === "img") {
    const src = srcFromLegacy(block.src);
    if (!src) return null;
    if (src.includes("dr-hanna")) return <FramedPortrait />;
    return (
      <Plate
        src={src}
        altEn="Procedure photograph, model"
        altPt="Fotografia do procedimento, modelo"
        captionEn="MODEL"
        captionPt="MODELO"
        className="max-w-xl py-4"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
    );
  }
  return null;
}

function Faq({ items }: { items: string[] }) {
  const pairs = items.map(faqPair).filter((x): x is { q: string; a: string } => !!x);
  return (
    <Accordion type="single" collapsible className="border-t border-line">
      {pairs.map((pair, i) => (
        <AccordionItem key={pair.q} value={`faq-${i}`}>
          <AccordionTrigger>
            <Tx text={pair.q} />
          </AccordionTrigger>
          <AccordionContent>
            <Tx text={pair.a || ""} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function DataTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  if (!head) return null;
  return (
    <div className="py-2">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              {head.map((cell) => (
                <th key={cell} className="py-3 pr-4 font-medium">
                  <Tx text={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, i) => (
              <tr key={i} className="border-b border-line align-top">
                {row.map((cell, j) => (
                  <td key={j} className="py-3 pr-4 text-muted">
                    <Tx text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Accordion type="single" collapsible className="border-t border-line md:hidden">
        {body.map((row, i) => (
          <AccordionItem key={i} value={`row-${i}`}>
            <AccordionTrigger>
              <Tx text={row[0] || ""} />
            </AccordionTrigger>
            <AccordionContent>
              <dl className="space-y-3">
                {row.slice(1).map((cell, j) => (
                  <div key={j}>
                    <dt className="caps text-ink">
                      <Tx text={head[j + 1] || ""} />
                    </dt>
                    <dd className="mt-1">
                      <Tx text={cell} />
                    </dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function ReviewCard({ review, photo = false }: { review: FeaturedReview; photo?: boolean }) {
  return (
    <article className="border-t border-line py-6">
      <p className="caps text-muted">
        {review.date} · {review.source}
      </p>
      {review.actual ? (
        <p className="mt-3 caps">
          <Tx text="Actual Patient" />
        </p>
      ) : null}
      {photo ? (
        <div className="relative mt-4 aspect-[4/3] max-w-sm overflow-hidden bg-paper-2">
          <Image
            src="/media/portraits/actual-patient-home-review.jpg"
            alt="Actual patient"
            fill
            sizes="400px"
            className="object-cover object-[center_20%]"
          />
        </div>
      ) : null}
      {review.body.map((para, i) => (
        <p key={i} className="mt-3">
          {para}
        </p>
      ))}
      <p className="mt-4 font-medium">{review.name}</p>
      <p className="lang-pt mt-2 caps text-muted">Avaliação original em inglês</p>
    </article>
  );
}

export function MarginNote({ quote }: { quote: string }) {
  return (
    <figure id="in-his-words" className="border-t border-gold pt-4">
      <Image
        src="/media/portraits/dr-hanna-upscaled-500.jpg"
        alt="Dr. Donald P. Hanna"
        width={500}
        height={500}
        className="mb-4 h-16 w-16 object-cover object-[center_15%]"
      />
      <blockquote className="text-[15px] font-light leading-relaxed">
        <Tx text={quote} />
      </blockquote>
      <figcaption className="mt-4 text-sm">— Dr. Donald P. Hanna</figcaption>
    </figure>
  );
}

export function SectionIndex({ items }: { items: { id: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="On this page">
      <p className="caps mb-3 hidden text-muted lg:block">
        <Tx text="On this page" />
      </p>
      <ul className="flex max-w-full gap-2 overflow-x-auto lg:block lg:space-y-2">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a href={`#${item.id}`} className="chip lg:border-0 lg:px-0 lg:py-0 lg:text-sm lg:text-muted lg:rounded-none">
              <Tx text={item.label} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
