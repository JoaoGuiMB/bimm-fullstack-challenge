export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string | null;
  tablet: string | null;
  desktop: string | null;
};

export type CreateCarFormValues = {
  make: string;
  model: string;
  year: string;
  color: string;
};

export type CreateCarResult =
  | { status: "created"; car: Car }
  | { status: "invalid"; message: string }
  | { status: "failed" };

export type CarSort = "model-asc" | "year-desc" | "year-asc";

export type CarFilters = {
  model: string;
  year: number | null;
  sort: CarSort;
};
