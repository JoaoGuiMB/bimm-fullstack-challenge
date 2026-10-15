import type { CreateCarFormValues } from "@/features/cars/types/car";
import { validateCarForm } from "./validateCarForm";

const VALID: CreateCarFormValues = {
  make: "Audi",
  model: "Q5",
  year: "2023",
  color: "Glacier White",
};

describe("validateCarForm", () => {
  it("accepts a complete car", () => {
    expect(validateCarForm(VALID)).toEqual({});
  });

  it("rejects a make or model made only of spaces", () => {
    const blank = { ...VALID, make: "   ", model: " " };

    const errors = validateCarForm(blank);

    expect(errors.make).toBe("Enter a make");
    expect(errors.model).toBe("Enter a model");
  });

  it("asks for a year when it is missing", () => {
    const noYear = { ...VALID, year: "" };

    expect(validateCarForm(noYear).year).toBe("Enter a year");
  });

  it("rejects a year that is not a whole number", () => {
    const decimal = { ...VALID, year: "2023.5" };
    const words = { ...VALID, year: "next year" };

    expect(validateCarForm(decimal).year).toBe("Enter the year as a number");
    expect(validateCarForm(words).year).toBe("Enter the year as a number");
  });

  it("accepts a blank color, as the API does", () => {
    const noColor = { ...VALID, color: "" };

    expect(validateCarForm(noColor)).toEqual({});
  });
});
