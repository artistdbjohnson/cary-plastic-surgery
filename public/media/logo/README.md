# Cary Plastic Surgery — logo kit (from caryplasticsurgery.com, exact)
- icon-lg.svg — the published figure mark (vector, 4 paths: 3 navy #005285 + 1 gold #f0c930 accent stroke). Source: https://caryplasticsurgery.com/images/icon-lg.svg
- cary-mark-currentcolor.svg — same 4 paths; navy paths use currentColor (white on dark / navy on light), gold accent uses var(--mark-accent,#f0c930). Paths unchanged.
- logo-white-on-dark.png — published header logo (204x81, white + gold, transparent). Small: use as reference only.
- og-image-source.jpg — published OG card showing the full lockup: mark left, "CARY" (Montserrat Bold, very wide caps) over "PLASTIC SURGERY" (Montserrat Regular caps), white on navy #1b324a.
- Rebuild the lockup in code: <svg mark> + "CARY" / "PLASTIC SURGERY" set in Montserrat (the site's own font) to match og-image-source.jpg proportions. Do not redraw or restyle the mark.
- maggy-award.png — The Maggy Awards "Best Plastic Surgery" badge (published).
- Path order in the SVG (for the contour-line open): path[0] small top-right head stroke, path[1] long body/torso sweep (navy), path[2] gold accent stroke (the "personal touch"), path[3] left arm/hair sweep (navy).
