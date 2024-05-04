export interface ISort<T = string> {
  sort: T;
  order: "asc" | "desc" | "ASC" | "DESC";
}
