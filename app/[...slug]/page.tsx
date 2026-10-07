import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageView } from "@/components/page-view";
import { getPage, keyToHref, pageKeyFromSlug, routableKeys } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return routableKeys().map((key) => ({ slug: keyToHref(key).replace(/^\//, "").split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const key = pageKeyFromSlug(slug);
  const page = key ? getPage(key) : undefined;
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function CatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = pageKeyFromSlug(slug);
  if (!key || !getPage(key)) notFound();
  return <PageView pageKey={key} />;
}
