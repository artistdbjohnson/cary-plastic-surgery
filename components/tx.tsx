"use client";

import Link from "next/link";
import dict from "@/content/pt.json";
import { normalizeHref } from "@/lib/links";

const DICT = dict as Record<string, string>;

function cleanStars(s: string): string {
  const t = s.trim();
  if (t.startsWith("*") && t.endsWith("*") && !t.startsWith("**")) return t.slice(1, -1).trim();
  return t;
}

export function ptOf(text: string): string {
  if (DICT[text]) return DICT[text];
  const wrapped = `*${text}*`;
  if (DICT[wrapped]) return cleanStars(DICT[wrapped]);
  return text;
}

function LinkText({ href, children }: { href: string; children: React.ReactNode }) {
  const next = normalizeHref(href);
  const className = "prose-link";
  if (next.external) {
    return (
      <a className={className} href={next.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (next.href.startsWith("tel:") || next.href.startsWith("mailto:") || next.href.startsWith("#")) {
    return (
      <a className={className} href={next.href}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={next.href}>
      {children}
    </Link>
  );
}

export function renderInline(raw: string): React.ReactNode {
  const text = raw.replace(/\*{2,}\s*Individual results vary\*{0,2}/gi, "\n** Individual results vary");
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g);
  return parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      if (inner.trim() === "Individual results vary" || inner.trim().startsWith("*")) {
        return (
          <span key={i} className="mt-3 block caps text-muted">
            {inner.startsWith("*") ? inner : `** ${inner}`}
          </span>
        );
      }
      return (
        <strong key={i} className="font-medium">
          {inner}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <LinkText key={i} href={link[2]}>
          {link[1]}
        </LinkText>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function Tx({ text, className }: { text: string; className?: string }) {
  if (!text) return null;
  const pt = ptOf(text);
  if (pt === text) {
    return <span className={className}>{renderInline(text)}</span>;
  }
  const enClass = className ? `${className} lang-en` : "lang-en";
  const ptClass = className ? `${className} lang-pt` : "lang-pt";
  return (
    <>
      <span className={enClass}>{renderInline(text)}</span>
      <span className={ptClass}>{renderInline(pt)}</span>
    </>
  );
}

export function Bi({ en, pt, className }: { en: string; pt: string; className?: string }) {
  const enClass = className ? `${className} lang-en` : "lang-en";
  const ptClass = className ? `${className} lang-pt` : "lang-pt";
  return (
    <>
      <span className={enClass}>{en}</span>
      <span className={ptClass}>{pt}</span>
    </>
  );
}
