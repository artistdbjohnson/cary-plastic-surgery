export type Block = {
  t: string;
  text?: string;
  items?: string[];
  rows?: string[][];
  src?: string;
};

export type Section = {
  id?: string;
  kind?: string;
  blocks: Block[];
};

export type PageHeader = {
  h1?: string;
  sub?: string;
  bullets?: string[];
  image?: string;
};

export type PageData = {
  url: string;
  title: string;
  description: string;
  header: PageHeader;
  sections: Section[];
};

export type FeaturedReview = {
  date: string;
  name: string;
  source: string;
  body: string[];
  actual?: boolean;
};

export type GoogleReview = {
  date: string;
  body: string[];
  name: string;
  source: string;
};
