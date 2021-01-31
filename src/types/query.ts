export interface QueryObject {
  q: string;
  page: string;
  user: string;
  sort: string;
  order: string;
  source: string;
  [key: string]: string;
}
