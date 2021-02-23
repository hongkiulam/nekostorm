export interface QueryObject {
  q: string;
  page: string;
  user: string;
  sort: SortOptions;
  order: "true" | "false";
  source: "nyaapantsu" | "nyaasi" | "animetosho";
  show: "all" | "noremake" | "trusted";
  [key: string]: string;
}

export type SortOptions = "date" | "size" | "seeders";
