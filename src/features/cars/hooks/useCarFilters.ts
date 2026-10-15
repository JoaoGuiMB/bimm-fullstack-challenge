import { useSearchParams } from "react-router-dom";
import type { CarFilters, CarSort } from "@/features/cars/types/car";

const SORTS: CarSort[] = ["model-asc", "year-desc", "year-asc"];
const DEFAULT_SORT: CarSort = "model-asc";

function parseYear(value: string | null) {
  return value && /^\d+$/.test(value) ? Number(value) : null;
}

function parseSort(value: string | null) {
  return SORTS.find((sort) => sort === value) ?? DEFAULT_SORT;
}

export function useCarFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: CarFilters = {
    model: searchParams.get("model") ?? "",
    year: parseYear(searchParams.get("year")),
    sort: parseSort(searchParams.get("sort")),
  };

  function setParam(key: keyof CarFilters, value: string) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);

        if (value) next.set(key, value);
        else next.delete(key);

        return next;
      },
      { replace: true }
    );
  }

  return {
    filters,
    setModel: (model: string) => setParam("model", model),
    setYear: (year: number | null) => setParam("year", year?.toString() ?? ""),
    setSort: (sort: CarSort) =>
      setParam("sort", sort === DEFAULT_SORT ? "" : sort),
  };
}
