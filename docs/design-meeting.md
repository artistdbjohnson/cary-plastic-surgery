# Design meeting — Cary Plastic Surgery (Path A pitch)
Date: Wed 2026-10-07 (USA geo day) · Studio lead: Grok · Source: https://caryplasticsurgery.com/ · Repo: artistdbjohnson/cary-plastic-surgery
Client: Cary Plastic Surgery — Dr. Donald P. Hanna, double board-certified plastic surgeon, 1608 Kildaire Farm Rd, Ste 100, Cary, NC 27511 · 919-233-1933.
Status check: not an existing dglxss.com case (checked lib/recent-cases.ts on artistdbjohnson/dglxss.com). Fallbacks (Lelands Homes, Origen Healthcare) not needed.

## Domain line (stated before any code)
```
Domain: UI/UX — factory transplant (pitch).
Craft shelf: [Motionsites seed: prisma-landing] (+ twist: the inset hero frame becomes a hand-troweled plaster "sculptor's atelier" with Dr. Hanna's own figure mark drawing itself as one contour line; giant CARY wordmark, Newsreader-italic "personal touch" accents).
Resource search: shadcn Accordion (Radix, MIT) USE for FAQs + implant/option tables; magicui Blur Fade looked at, not shipped (own framer-motion reveal). Color search: colorable.jxnblk.com contrast pass on the client's own navy/gold → gold is stroke/hairline only on light. Tool pass: footer.design "Large Type" + Mobbin booking flows (look only). Inspiration vote: visualjournal.it (Reed seat) — editorial captions + margin discipline (look only). Motion shelf: Prompt Motion "TypingMind logo reveal" (@tdinh_me) — slow-reveal mark assembly attitude, own code, prefers-reduced-motion honored. Expensive: honed limestone plaster + navy ink + one gold line.
Locks: EN|PT + dark|light.
Stack: React + Tailwind + Next.js + GitHub + Vercel.
```

## Must not look like Franklin Plastic Surgery (prior plastic-surgery pitch)
Franklin = Motionsites surgical-prestige, credentials-letterhead stamp open, matte chrome, credentials trust dock, procedure constellation, Triangle catchment dock, Cormorant Garamond + Outfit.
Cary = prisma-landing inset atelier frame, contour-line open from the client's own mark, plaster (not chrome), Dr. Hanna's own first-person "personal touch" voice as margin notes, real-building arrival triptych, Montserrat (brand) + Newsreader italic. No letterhead, no stamp, no constellation, no catchment map, no chrome.

## Opening vote (must differ from every prior open)
| Candidate | For | Against | Votes |
|---|---|---|---|
| **A. Contour-line open — "the personal touch"**: the client's own figure mark (icon-lg.svg, 4 paths) draws itself as one line on plaster (stroke-mask reveal along each path), gold accent stroke lands last, "Sculpting Beauty with a Personal Touch." writes in (Newsreader italic, clip L→R), lockup FLIPs into the nav slot and the inset hero rises. ≤2.4 s, once per session. | It is the tagline made literal ("sculpting" + "personal touch"); uses the client's real mark, not a new device; no video splash; nothing like a stamp/crest/poster/curtain/aperture. | Needs careful path order + mask so the fill doesn't flash. | **Reed, Nia, Lux, Prism, Mira, Axiom, Kit, Ash, Wren, Glyph, Vale, Jules (12)** |
| B. Plaster-cast reveal: hero plate un-blurs from a plaster dust field | Material-forward | Reads as a generic blur-in; close to Farmington/Quinta poster family | Tasker (1) |
| C. Practice-film splash (client's 7.4 s hero film full-bleed) | Client's own media | Video splash = BRA; swimsuit film as first frame is loud, not "personal" | 0 |
| D. Signature open (Dr. Hanna signs his name) | Personal | Invents a signature we don't have — not exact | 0 |

Prior opens checked against (none reused): Farmington poster · Boho Ken Burns · BRA splash video · LP crest micro-loader · Batley quiet open · Franklin letterhead stamp · Quinta cinematic poster · Adamthwaite scroll-reveal · Forsyth verandah curtain · Oralvide smile stamp · City Skin HIW|CQC twin-badge · Axis Growth stamp · Lane key-aperture · Espacio lexicon.
**WIN: A — Contour-line open.** Video did not win, so Grok Imagine not required for the open. Skip rules: skipped on hash deep-link, `prefers-reduced-motion` (static lockup, no draw), tap / click / Esc / any key; sessionStorage `cps-open-seen`. Never blocks content > 2.4 s; content is in the DOM underneath (SSR), open is an overlay.

## Inspiration-shelf vote (look only — never copy a logo, brand system, post, deck or studio work)
| Seat | Shelf | Pull | Vote |
|---|---|---|---|
| Reed, Nia, Lux, Prism | visualjournal.it | Editorial journal layouts: wide margins, small-caps captions under every plate, one accent, type doing the luxury | **WIN (9)** — Reed, Nia, Lux, Prism, Mira, Kit, Wren, Vale, Jules |
| Mira, Axiom, Kit, Ash | recent.design | Current site/OG catalog: inset hero frames, pill CTAs with circle arrows | 3 — Axiom, Ash, Glyph (folded into the prisma seed already) |
| Wren, Glyph, Tasker | brandguidelines.net | Guideline-page clear-space rules for the lockup | 1 — Tasker (applied: mark clear-space = height of "C") |
| Vale | noiced.com | Grain/noise texture | 0 (plaster grain already chosen) |
| Jules | deck.gallery | — | 0 |
Take: every photo plate gets a small-caps caption line (e.g. "MODEL · BREAST" / "THE FOYER · 1608 KILDAIRE FARM RD"), 12-col grid with a generous left margin column that holds Dr. Hanna's margin notes. Look only.

## Free-resource search (website-factory shelves A/B, free + MIT only)
- Shelf A: easyui / great-ui / paceui browsed for booking-form patterns → none shipped; paceui-style segmented "Preferred Time" chips rebuilt in our own code. vantaui, dev.cards = do-not-ship (unchanged).
- Shelf B (free subset): **shadcn/ui Accordion (Radix, MIT) — USE** for procedure FAQs and the Breast Augmentation implant tables (collapsible on phone). magicui "Blur Fade" (MIT) — looked at, not shipped; own framer-motion reveal matches the seed easing. motion-primitives "Text Effect" (MIT) — reference for per-word pull-up; implemented ourselves. Aceternity = do-not-ship.
- Record MIT notices in THIRD_PARTY.md (shadcn, Radix, framer-motion, lucide if used).

## Color-shelf search
- Client palette is EXACT (not a rebrand): navy #005285 (mark/links), deep navy #1b324a (header/footer field), gold #f0c930 (accent stroke), plus white.
- colorable.jxnblk.com contrast pass (computed): #005285 on plaster #F3EEE6 = 7.14 (AAA body) · #1b324a on plaster = 11.35 · gold #f0c930 on plaster = **1.39 (fail → never text on light; stroke/hairline/dot only)** · gold on night #0F1C2B = 10.73 (ok for dark-theme accents) · bone #EDE6DA on night = 13.86 · muted #5E6B78 on plaster = 4.72 (AA small text) · #1b324a on gold = 8.18 (gold pill with navy text allowed).
- backgrounds.supply gradient-lab: no gradient shipped; one 6% navy→transparent vignette on hero authored in CSS ourselves. ramps.studio look-only. shadergradient not used (matte, no shader sheen). colir / zoxilsi = do-not-ship.
- Tokens (author them in CSS): light `--paper #F3EEE6`, `--paper-2 #EAE3D8`, `--ink #1b324a`, `--brand #005285`, `--muted #5E6B78`, `--line rgba(27,50,74,.14)`, `--gold #f0c930`; dark `--paper #0F1C2B`, `--paper-2 #152639`, `--ink #EDE6DA`, `--brand #8FB6D6`, `--muted #A9B4C0`, `--line rgba(237,230,218,.14)`, `--gold #f0c930`.

## Tool pass (reference only)
- footer.design "Large Type" → footer closes on a giant tracked CARY wordmark (echo of the hero wordmark), contact + hours above it.
- Mobbin booking flows → Request Appointment form as three calm grouped fieldsets (Personal Information / Appointment Information / Message) with chip selectors; exact field labels from the source.
- navbar.gallery → hanging pill nav (seed) with mega-dropdowns for About/Breast/Body/Face/Cosmetic.

## Prompt Motion attitude (look only, our own code)
Reference: "TypingMind logo reveal" — https://www.prompt-motion.com/tdinh-me-815acb (@tdinh_me). Attitude taken: **slow assembly** — a mark built piece by piece with long ease-out holds, one gesture, nothing bouncing. We never rehost the clip or paste its prompt. Applied to the contour-line open and to the About-card per-character reveal. All motion honors `prefers-reduced-motion` (no draw, no parallax, no autoplay film — poster frame instead).

## Craft vote
| Option | Votes |
|---|---|
| **Motionsites seed prisma-landing** (unused by any prior build): inset rounded hero frame + noise overlay, hanging black pill nav, giant bottom wordmark ~20vw (tracking -0.07em, WordsPullUp stagger 0.08 s), right column description + pill CTA with circle arrow (ease [0.16,1,0.3,1]), About card with multi-style headline (normal + serif italic) + scroll-linked per-character opacity 0.2→1, 4-card feature grid with a video first card (scale 0.95 → 1, stagger 0.15 s, ease [0.22,1,0.36,1]). | **WIN (11)** |
| Free Framer template (editorial clinic) | 2 (Kit, Tasker) |
Remap: Almarai → **Montserrat** (the client's own logo/brand font, next/font); Instrument Serif italic → **Newsreader italic** (OFL, next/font) for the "personal touch" accents; black pill nav → deep-navy #1b324a pill; giant wordmark "CARY" in Montserrat 600 tracking -0.07em (light: navy ink on plaster; dark: bone on night). Already-used seeds avoided: prosthetics-hero, vortex-studio-hero, trust-editorial, equilibrium, neo-museum, aethera-hero, mythic-naturecore, skyelite-hero, clinical-editorial, wanderful-hero, surgical-prestige.

## Expensive material
Hand-troweled **honed limestone plaster** (warm cream, faint trowel grain via 3% feTurbulence noise) + **navy ink** + **one gold line**. Matte everywhere: no glass sameness, no chrome, no glow, no gradients-as-decoration. Plates share one photographic grade (raking window light, navy shadows, medium-format grain). Type, spacing and photography carry the cost; restraint over decoration.

## Axiom twists (3)
1. **Contour-line open** — the client's own figure mark draws itself; gold "personal touch" stroke lands last; hands off to the nav lockup.
2. **"In his words" margin notes** — every procedure page lifts Dr. Hanna's exact first-person doctor-cta paragraph into a signed margin note (gold 1 px rule, small real portrait, "— Dr. Donald P. Hanna"); on Home the line "Patients trust him not only for his surgical skill—but for how he listens." gets the seed's scroll-linked per-character reveal.
3. **Arrival triptych** — real photos of 1608 Kildaire Farm Rd (exterior → entrance → foyer → atrium) with the exact "State-of-the-Art Facility" copy from /why-cary-plastic-surgery; pinned horizontal scroll on desktop, swipe/snap on phone; beside it the published hours with a live "Open today · until 5:00 pm" / "Closed now" chip computed in America/New_York, phone, directions, "$50 New Patient Consultation".

## Reed taste gate
- Kill: icon grids, emoji, stock "spa" clichés, liquid glass, chrome, purple gradients, testimonial carousels that auto-advance, fake stats, invented claims.
- Keep: ad-grade photo plate in every major section (hero, services, about, consult, reviews, arrival, contact, every hub + procedure page), small-caps captions, one gold line, generous whitespace (factory-spacing-scroll-photography rhythm: section padding clamp(96px,12vh,160px) desktop / 72px phone).
- Reed: **PASS** (conditional on plate coverage + nav spacing at 1440/390 in the gauntlet).

## Identity / staff portraits
- Real published staff on caryplasticsurgery.com: **Dr. Donald P. Hanna only** (index-doctor-sm.jpg, 125 px, white coat + red tie). No other staff portraits are published.
- Remap plan: identity-preserving upgrade of the REAL portrait into a plaster consult-room editorial scene (same face, hair, age, white coat, red tie). Never invent a fake doctor face. Studio-side Figma Weave image-to-image requires per-run user approval (not available in an autonomous run) → handed to the build agent with a strict "same person or discard" rule; fallback is the real upscaled portrait (dr-hanna-upscaled-500.jpg) in a small framed treatment. Final result recorded in the repo at docs/media-notes.md and in the Done card.
- All other people in plates are generated "Model" figures (the source site itself tags its procedure photos "Model"); captions keep the "MODEL" tag.
- Excluded: before/after and patient result photos (nudity / patient privacy) — the gallery page links to the live gallery instead of rehosting.

## IA (same slugs as live)
Home · /why-cary-plastic-surgery · /meet-dr-hanna · /patient-testimonials (all 61 reviews) · /breast-plastic-surgery (+ breast-augmentation, breast-lift, breast-reduction, breast-implant-removal, gynecomastia) · /body-plastic-surgery (+ tummy-tuck, liposuction, arm-lift, thigh-lift, labial-reduction-reconstruction) · /face-plastic-surgery (+ facelift, blepharoplasty, brow-lift, otoplasty, rhinoplasty) · /cosmetic-plastic-surgery (+ lip-filler, injectables, microneedling, scar-revisions) · /before-after-gallery (category index → live gallery) · /contact-us · /request-appointment · /accessibility · /privacy-policy · /terms-and-conditions · /sitemap.

## Ash 10/10 (target, scored at gauntlet)
Ash pre-score of the plan: 9.5 — open, seed, material, twists all distinct; risk items: nav fit at 1440 with 8 items + phone + toggles, and Dr. Hanna portrait resolution. Final gauntlet score recorded below after review.

## Gauntlet log
(filled after preview review)
