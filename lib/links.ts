import { LIVE_ORIGIN } from "@/lib/nav";

export function normalizeHref(href: string): { href: string; external: boolean } {
  if (!href) return { href: "/", external: false };
  if (href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#")) {
    return { href, external: false };
  }
  let path = href;
  if (path.startsWith(LIVE_ORIGIN)) {
    path = path.slice(LIVE_ORIGIN.length) || "/";
  }
  if (path.startsWith("/before-after-gallery/") && path !== "/before-after-gallery") {
    return { href: `${LIVE_ORIGIN}${path}`, external: true };
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return { href: path, external: true };
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return { href: path, external: false };
}
