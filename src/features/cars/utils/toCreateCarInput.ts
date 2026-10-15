import type { CreateCarInput } from "@/features/cars/api/createCar";
import type { CreateCarFormValues } from "@/features/cars/types/car";

export function toCreateCarInput(values: CreateCarFormValues): CreateCarInput {
  return {
    make: values.make.trim(),
    model: values.model.trim(),
    year: Number(values.year),
    color: values.color.trim(),
    mobile: null,
    tablet: null,
    desktop: null,
  };
}
