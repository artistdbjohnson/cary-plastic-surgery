export type NavLink = { label: string; href: string };

export type NavGroup = {
  label: string;
  href: string;
  hubLabel: string;
  children: NavLink[];
};

export const ABOUT: NavGroup = {
  label: "About",
  href: "/why-cary-plastic-surgery",
  hubLabel: "Why Cary Plastic Surgery",
  children: [
    { label: "Why Cary Plastic Surgery", href: "/why-cary-plastic-surgery" },
    { label: "Meet Dr. Hanna", href: "/meet-dr-hanna" },
    { label: "Patient Testimonials", href: "/patient-testimonials" },
  ],
};

export const BREAST: NavGroup = {
  label: "Breast",
  href: "/breast-plastic-surgery",
  hubLabel: "Breast Plastic Surgery",
  children: [
    { label: "Breast Augmentation", href: "/breast-plastic-surgery/breast-augmentation" },
    { label: "Breast Lift", href: "/breast-plastic-surgery/breast-lift" },
    { label: "Breast Reduction", href: "/breast-plastic-surgery/breast-reduction" },
    { label: "Breast Implant Removal", href: "/breast-plastic-surgery/breast-implant-removal" },
    { label: "Gynecomastia", href: "/breast-plastic-surgery/gynecomastia" },
  ],
};

export const BODY: NavGroup = {
  label: "Body",
  href: "/body-plastic-surgery",
  hubLabel: "Body Plastic Surgery",
  children: [
    { label: "Tummy Tuck", href: "/body-plastic-surgery/tummy-tuck" },
    { label: "Liposuction", href: "/body-plastic-surgery/liposuction" },
    { label: "Arm Lift", href: "/body-plastic-surgery/arm-lift" },
    { label: "Thigh Lift", href: "/body-plastic-surgery/thigh-lift" },
    { label: "Labial Reduction / Reconstruction", href: "/body-plastic-surgery/labial-reduction-reconstruction" },
  ],
};

export const FACE: NavGroup = {
  label: "Face",
  href: "/face-plastic-surgery",
  hubLabel: "Face Plastic Surgery",
  children: [
    { label: "Facelift", href: "/face-plastic-surgery/facelift" },
    { label: "Blepharoplasty", href: "/face-plastic-surgery/blepharoplasty" },
    { label: "Brow Lift", href: "/face-plastic-surgery/brow-lift" },
    { label: "Otoplasty", href: "/face-plastic-surgery/otoplasty" },
    { label: "Rhinoplasty", href: "/face-plastic-surgery/rhinoplasty" },
  ],
};

export const COSMETIC: NavGroup = {
  label: "Cosmetic",
  href: "/cosmetic-plastic-surgery",
  hubLabel: "Cosmetic Plastic Surgery",
  children: [
    { label: "Lip Filler", href: "/cosmetic-plastic-surgery/lip-filler" },
    { label: "Injectables", href: "/cosmetic-plastic-surgery/injectables" },
    { label: "Microneedling", href: "/cosmetic-plastic-surgery/microneedling" },
    { label: "Scar Revisions", href: "/cosmetic-plastic-surgery/scar-revisions" },
  ],
};

export const GROUPS: NavGroup[] = [ABOUT, BREAST, BODY, FACE, COSMETIC];

export const PHONE_DISPLAY = "919-233-1933";
export const PHONE_TEL = "tel:+19192331933";
export const ADDRESS_LINES = ["1608 Kildaire Farm Rd, Ste 100", "Cary, NC 27511"];
export const MAPS_URL =
  "https://maps.google.com/?q=1608%20Kildaire%20Farm%20Rd,%20Ste%20100,Cary,NC%2027511";
export const GOOGLE_REVIEWS =
  "https://maps.google.com/maps?cid=12201620724866334020";
export const LIVE_APPOINTMENT = "https://caryplasticsurgery.com/request-appointment";
export const LIVE_ORIGIN = "https://caryplasticsurgery.com";

export const HOURS: { day: string; time: string }[] = [
  { day: "Monday", time: "8:00 am - 5:00 pm" },
  { day: "Tuesday", time: "8:00 am - 5:00 pm" },
  { day: "Wednesday", time: "8:00 am - 5:00 pm" },
  { day: "Thursday", time: "8:00 am - 5:00 pm" },
  { day: "Friday", time: "8:00 am - 12:00 pm" },
];

export function groupForHub(hub: string): NavGroup | undefined {
  return GROUPS.find((g) => g.href === `/${hub}`);
}

export const GALLERY_LINKS: { group: string; items: NavLink[] }[] = [
  {
    group: "Breast",
    items: [
      { label: "Breast Augmentation", href: "/before-after-gallery/breast-augmentation" },
      { label: "Breast Lift", href: "/before-after-gallery/breast-lift" },
      { label: "Breast Reduction", href: "/before-after-gallery/breast-reduction" },
    ],
  },
  {
    group: "Body",
    items: [
      { label: "Tummy Tuck", href: "/before-after-gallery/tummy-tuck" },
      { label: "Liposuction", href: "/before-after-gallery/liposuction" },
      { label: "Arm Lift", href: "/before-after-gallery/arm-lift" },
    ],
  },
  {
    group: "Face",
    items: [
      { label: "Facelift", href: "/before-after-gallery/facelift" },
      { label: "Rhinoplasty", href: "/before-after-gallery/rhinoplasty" },
      { label: "Blepharoplasty", href: "/before-after-gallery/blepharoplasty" },
    ],
  },
  {
    group: "Cosmetic",
    items: [
      { label: "Lip Fillers", href: "/before-after-gallery/lip-fillers" },
      { label: "Injectables", href: "/before-after-gallery/injectables" },
      { label: "Microneedling", href: "/before-after-gallery/microneedling" },
    ],
  },
];

export const AFFILIATIONS: { src: string; name: string }[] = [
  { src: "/media/affiliations/asps.jpg", name: "American Society of Plastic Surgeons" },
  { src: "/media/affiliations/ncms.jpg", name: "North Carolina Medical Society" },
  { src: "/media/affiliations/asaps.jpg", name: "The Aesthetic Society" },
  { src: "/media/affiliations/wakemed.jpg", name: "WakeMed" },
  { src: "/media/affiliations/asf.jpg", name: "Accredited Surgery Facility" },
  { src: "/media/affiliations/duke.jpg", name: "Duke" },
];
