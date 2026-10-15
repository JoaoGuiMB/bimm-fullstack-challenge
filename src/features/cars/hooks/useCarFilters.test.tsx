import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { useCarFilters } from "./useCarFilters";

function renderAt(route: string) {
  return renderHook(() => useCarFilters(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
  });
}

describe("useCarFilters", () => {
  it("reads the filters from the URL", () => {
    const { result } = renderAt("/?model=q5&year=2023&sort=year-desc");

    expect(result.current.filters).toEqual({
      model: "q5",
      year: 2023,
      sort: "year-desc",
    });
  });

  it("falls back to the defaults for invalid values", () => {
    const { result } = renderAt("/?year=soon&sort=price");

    expect(result.current.filters).toEqual({
      model: "",
      year: null,
      sort: "model-asc",
    });
  });
});
