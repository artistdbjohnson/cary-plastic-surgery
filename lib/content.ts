import pagesJson from "@/docs/pages.json";
import featuredJson from "@/content/featured-reviews.json";
import reviewsJson from "@/docs/reviews.json";
import type { FeaturedReview, GoogleReview, PageData, Section } from "@/lib/types";

const pages = pagesJson as Record<string, PageData>;

export const featuredReviews = featuredJson as Record<string, FeaturedReview[]>;

export const allReviews = (reviewsJson as { summary: string; reviews: GoogleReview[] }).reviews;

export const reviewSummary = "5 / 5 based upon 61 reviews.";

export function getPage(key: string): PageData | undefined {
  return pages[key];
}

export function pageKeyFromSlug(slug: string[] | undefined): string | null {
  if (!slug || slug.length === 0) return "home";
  if (slug.length === 1) return slug[0];
  if (slug.length === 2) return `${slug[0]}_${slug[1]}`;
  return null;
}

const SKIP = new Set(
  Object.keys(pages).filter(
    (k) => k.startsWith("patient-testimonials_page_") || k.startsWith("before-after-gallery_"),
  ),
);

export function routableKeys(): string[] {
  return Object.keys(pages).filter((k) => k !== "home" && !SKIP.has(k));
}

export function keyToHref(key: string): string {
  if (key === "home") return "/";
  if (key.includes("_")) {
    const [a, b] = key.split("_");
    return `/${a}/${b}`;
  }
  return `/${key}`;
}

export function liveUrl(key: string): string {
  const href = keyToHref(key);
  return `https://caryplasticsurgery.com${href === "/" ? "/" : href}`;
}

export function anchorFor(kind: string, index: number): string {
  const k = kind || "";
  if (k.includes("faq")) return "faqs";
  if (k.includes("cost")) return "cost";
  if (k.includes("procedure") || k.includes("surgery")) return "procedure";
  if (k.includes("options")) return "options";
  if (k.includes("benefit")) return "benefits";
  if (k.includes("doctor-cta")) return "in-his-words";
  if (k.includes("review")) return "review";
  if (k.includes("state-of-the-art")) return "facility";
  if (k.includes("philosophy")) return "philosophy";
  if (k.includes("award")) return "awards";
  if (k.includes("patient-centered")) return "patient-centered";
  if (k.includes("personal-touch")) return "personal-touch";
  if (k.includes("long-description")) return "about";
  if (k.includes("intro")) return "intro";
  if (k.includes("-links") || k.endsWith("links")) return "services";
  if (k.includes("content")) return "overview";
  if (k.includes("doctor")) return "doctor";
  return `section-${index + 1}`;
}

export function firstPersonQuote(page: PageData): string | null {
  const section = page.sections.find((s) => (s.kind || "").includes("doctor-cta"));
  if (!section) return null;
  const para = section.blocks.find((b) => b.t === "p" && b.text);
  if (!para?.text) return null;
  return stripStars(para.text);
}

export function stripStars(text: string): string {
  let t = text.trim();
  if (t.startsWith("*") && t.endsWith("*") && !t.startsWith("**")) {
    t = t.slice(1, -1).trim();
  }
  return t;
}

export function sectionHeading(section: Section): string | null {
  const h = section.blocks.find((b) => (b.t === "h2" || b.t === "h3") && b.text);
  return h?.text ?? null;
}

export function isProcedureKey(key: string): boolean {
  return key.includes("_") && !key.startsWith("before-after") && !key.startsWith("patient-");
}

export function isHubKey(key: string): boolean {
  return (
    key === "breast-plastic-surgery" ||
    key === "body-plastic-surgery" ||
    key === "face-plastic-surgery" ||
    key === "cosmetic-plastic-surgery"
  );
}

export function searchable(): { href: string; title: string; description: string }[] {
  const keys = ["home", ...routableKeys()];
  return keys.map((k) => ({
    href: keyToHref(k),
    title: pages[k].title,
    description: pages[k].description,
  }));
}
