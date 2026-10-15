import type { Car, CarSort } from "@/features/cars/types/car";

const COMPARATORS: Record<CarSort, (a: Car, b: Car) => number> = {
  "model-asc": (a, b) =>
    a.model.localeCompare(b.model, undefined, { sensitivity: "base" }),
  "year-desc": (a, b) => b.year - a.year,
  "year-asc": (a, b) => a.year - b.year,
};

export function sortCars(cars: Car[], sort: CarSort) {
  return [...cars].sort(COMPARATORS[sort]);
}
