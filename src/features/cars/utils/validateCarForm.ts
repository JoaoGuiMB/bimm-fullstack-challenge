import type { CreateCarFormValues } from "@/features/cars/types/car";

export type CreateCarFormErrors = Partial<
  Record<keyof CreateCarFormValues, string>
>;

export function validateCarForm(
  values: CreateCarFormValues
): CreateCarFormErrors {
  const errors: CreateCarFormErrors = {};
  const year = values.year.trim();

  if (!values.make.trim()) errors.make = "Enter a make";
  if (!values.model.trim()) errors.model = "Enter a model";
  if (!year) errors.year = "Enter a year";
  else if (!/^\d+$/.test(year)) errors.year = "Enter the year as a number";

  return errors;
}
