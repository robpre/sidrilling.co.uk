export type PageFields1 = {
  layout: string;
  title: string;
  subtitle: string;
  draft: boolean;
};

export type CollectionFields1 = {
  title: string;
  subtitle: string;
  draft: boolean;
  image: string;
  image_altText: string;
};

export type CollectionFields2 = {
  title: string;
  subtitle: string;
  draft: boolean;
  image: string;
  image_altText: string;
  date: string;
  equipmentID: string[];
};

export type PagesNames =
  | "404"
  | "case-studies"
  | "equipment"
  | "index-page"
  | "privacy-policy"
  | "services-what-we-do"
  | "team-who-we-are";
export type CollectionsNames = "equipment" | "jobs";

export interface Pages {
  "404": PageFields1;
  "case-studies": PageFields1;
  equipment: PageFields1;
  "index-page": PageFields1;
  "privacy-policy": PageFields1;
  "services-what-we-do": PageFields1;
  "team-who-we-are": PageFields1;
}
export interface Collections {
  equipment: CollectionFields1;
  jobs: CollectionFields2;
}
