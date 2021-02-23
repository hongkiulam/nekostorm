import type { QueryObject } from "../types/query";

export const sortOptions = [
  { label: "Date (Descending) - Default", value: "date|false" },
  { label: "Date (Ascending)", value: "date|true" },
  { label: "Size (Descending)", value: "size|false" },
  { label: "Size (Ascending)", value: "size|true" },
  { label: "Seeders (Descending)", value: "seeders|false" },
  { label: "Seeders (Ascending)", value: "seeders|true" },
];

export const sourceOptions: {
  label: string;
  value: QueryObject["source"];
}[] = [
  { label: "Animetosho", value: "animetosho" },
  { label: "Nyaa Si", value: "nyaasi" },
  { label: "Nyaa Pantsu", value: "nyaapantsu" },
];

export const showOptions: {
  label: string;
  value: QueryObject["show"];
}[] = [
  { label: "All results", value: "all" },
  { label: "No remakes", value: "noremake" },
  { label: "Trusted only", value: "trusted" },
];

export const size = {
  u: "12",
  u2: "24",
  u3: "36",
  u4: "48",
};
