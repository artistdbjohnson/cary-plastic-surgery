import mediaIndex from "@/content/media-index.json";

const HAVE = new Set(mediaIndex as string[]);

const ALIAS: Record<string, string> = {
  "lip-filler-header": "lip-fillers-header",
  "lip-filler-link": "lip-fillers-link",
  "lip-fillers-intro": "lip-filler-intro",
  "lip-fillers-benefits": "lip-filler-benefits",
};

export type Shot = {
  src: string;
  captionEn: string;
  captionPt: string;
  altEn: string;
  altPt: string;
  position?: string;
  aspect?: string;
};

const HUB_FALLBACK: Record<string, Shot> = {
  "breast-plastic-surgery": {
    src: "/media/plates/pillar-breast.jpg",
    captionEn: "MODEL · BREAST",
    captionPt: "MODELO · MAMA",
    altEn: "Model in a plaster studio, breast surgery series",
    altPt: "Modelo num estúdio de gesso, série de cirurgia mamária",
    position: "center 20%",
  },
  "body-plastic-surgery": {
    src: "/media/plates/pillar-body.jpg",
    captionEn: "MODEL · BODY",
    captionPt: "MODELO · CORPO",
    altEn: "Model seated in profile, body contouring series",
    altPt: "Modelo de perfil, série de contorno corporal",
    position: "center 18%",
    aspect: "aspect-[3/4]",
  },
  "face-plastic-surgery": {
    src: "/media/plates/pillar-face.jpg",
    captionEn: "MODEL · FACE",
    captionPt: "MODELO · ROSTO",
    altEn: "Model portrait, facial surgery series",
    altPt: "Retrato de modelo, série de cirurgia facial",
    position: "center 25%",
  },
  "cosmetic-plastic-surgery": {
    src: "/media/plates/pillar-cosmetic.jpg",
    captionEn: "MODEL · COSMETIC",
    captionPt: "MODELO · ESTÉTICA",
    altEn: "Model, cosmetic treatment series",
    altPt: "Modelo, série de tratamentos estéticos",
    position: "center 22%",
  },
};

export function procedureShot(slug: string, kind: string): string | null {
  const key = `${slug}-${kind}`;
  const names = [key, ALIAS[key]].filter(Boolean) as string[];
  for (const name of names) {
    const path = `/media/procedures/${name}.jpg`;
    if (HAVE.has(path)) return path;
  }
  return null;
}

export function hubOf(key: string): string {
  if (key.includes("_")) return key.split("_")[0];
  return key;
}

export function slugOf(key: string): string {
  if (key.includes("_")) return key.split("_")[1];
  return key;
}

export function shotFor(key: string, kind: "header" | "intro" | "benefits" | "link" | "procedure"): Shot {
  const hub = hubOf(key);
  const slug = slugOf(key);
  const fallback = HUB_FALLBACK[hub] ?? HUB_FALLBACK["breast-plastic-surgery"];
  const file = procedureShot(slug, kind);
  if (file) {
    return {
      ...fallback,
      src: file,
      aspect: kind === "header" ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[4/3]",
    };
  }
  return { ...fallback, aspect: kind === "header" ? "aspect-[16/9] md:aspect-[2/1]" : fallback.aspect };
}

export function headerShot(key: string): Shot {
  const special: Record<string, Shot> = {
    home: {
      src: "/media/plates/hero-atelier.jpg",
      captionEn: "MODEL",
      captionPt: "MODELO",
      altEn: "Model in ivory silk beside an arched window in a plaster atelier",
      altPt: "Modelo de seda marfim junto a uma janela em arco, num atelier de gesso",
      position: "22% 28%",
    },
    "why-cary-plastic-surgery": {
      src: "/media/location/exterior-entrance.jpg",
      captionEn: "THE ENTRANCE · 1608 KILDAIRE FARM RD",
      captionPt: "A ENTRADA · 1608 KILDAIRE FARM RD",
      altEn: "Entrance of Cary Plastic Surgery at 1608 Kildaire Farm Road",
      altPt: "Entrada da Cary Plastic Surgery em 1608 Kildaire Farm Road",
      position: "center center",
    },
    "meet-dr-hanna": {
      src: "/media/portraits/surgeon-at-work-bw.jpg",
      captionEn: "THE OPERATING ROOM",
      captionPt: "O BLOCO OPERATÓRIO",
      altEn: "Dr. Donald P. Hanna in the operating room",
      altPt: "Dr. Donald P. Hanna no bloco operatório",
      position: "center 30%",
    },
    "patient-testimonials": {
      src: "/media/plates/reviews-stilllife.jpg",
      captionEn: "THE PRACTICE",
      captionPt: "A CLÍNICA",
      altEn: "Still life from the Cary Plastic Surgery practice",
      altPt: "Natureza-morta da clínica Cary Plastic Surgery",
      position: "center center",
    },
    "before-after-gallery": {
      src: "/media/plates/gallery-mirror.jpg",
      captionEn: "GALLERY",
      captionPt: "GALERIA",
      altEn: "Gallery still life",
      altPt: "Natureza-morta da galeria",
      position: "center center",
    },
    "contact-us": {
      src: "/media/location/foyer.jpg",
      captionEn: "THE FOYER · 1608 KILDAIRE FARM RD",
      captionPt: "O ÁTRIO DE ENTRADA · 1608 KILDAIRE FARM RD",
      altEn: "Foyer at 1608 Kildaire Farm Road",
      altPt: "Átrio de entrada em 1608 Kildaire Farm Road",
      position: "center center",
    },
    "request-appointment": {
      src: "/media/plates/consult-desk.jpg",
      captionEn: "THE CONSULT",
      captionPt: "A CONSULTA",
      altEn: "Hands at a consultation desk",
      altPt: "Mãos numa secretária de consulta",
      position: "center center",
    },
  };
  if (special[key]) return { ...special[key], aspect: "aspect-[16/9] md:aspect-[2/1]" };
  if (HUB_FALLBACK[key]) return { ...HUB_FALLBACK[key], aspect: "aspect-[16/9] md:aspect-[2/1]" };
  if (key.includes("_") && HUB_FALLBACK[key.split("_")[0]]) return shotFor(key, "header");
  return {
    src: "/media/location/building-exterior-wide.jpg",
    captionEn: "1608 KILDAIRE FARM RD",
    captionPt: "1608 KILDAIRE FARM RD",
    altEn: "Cary Plastic Surgery, 1608 Kildaire Farm Road",
    altPt: "Cary Plastic Surgery, 1608 Kildaire Farm Road",
    position: "center center",
    aspect: "aspect-[16/7]",
  };
}

export function srcFromLegacy(src: string | undefined): string | null {
  if (!src) return null;
  const base = src.split("/").pop() || "";
  if (base.includes("index-doctor")) return "/media/portraits/dr-hanna-upscaled-500.jpg";
  if (base.includes("index-patient") || base.includes("patient-review")) {
    return "/media/portraits/actual-patient-home-review.jpg";
  }
  const cleaned = base.replace(/-sm(?=\.)/, "").replace(/-xs(?=\.)/, "");
  const proc = `/media/procedures/${cleaned}`;
  if (HAVE.has(proc)) return proc;
  return null;
}
