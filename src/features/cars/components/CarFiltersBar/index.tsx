import { MenuItem, Stack, TextField } from "@mui/material";
import type { CarFilters, CarSort } from "@/features/cars/types/car";

type CarFiltersBarProps = {
  filters: CarFilters;
  onModelChange: (model: string) => void;
  onYearChange: (year: number | null) => void;
  onSortChange: (sort: CarSort) => void;
};

const SORT_OPTIONS: { value: CarSort; label: string }[] = [
  { value: "model-asc", label: "Model A–Z" },
  { value: "year-desc", label: "Newest first" },
  { value: "year-asc", label: "Oldest first" },
];

export function CarFiltersBar({
  filters,
  onModelChange,
  onYearChange,
  onSortChange,
}: CarFiltersBarProps) {
  function handleYearChange(value: string) {
    const digits = value.replace(/\D/g, "");

    onYearChange(digits ? Number(digits) : null);
  }

  function handleSortChange(value: string) {
    const option = SORT_OPTIONS.find(
      (sortOption) => sortOption.value === value
    );

    if (option) onSortChange(option.value);
  }

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField
        label="Search by model"
        type="search"
        value={filters.model}
        onChange={(event) => onModelChange(event.target.value)}
      />
      <TextField
        label="Year"
        value={filters.year ?? ""}
        onChange={(event) => handleYearChange(event.target.value)}
        slotProps={{ htmlInput: { inputMode: "numeric" } }}
      />
      <TextField
        select
        label="Sort by"
        value={filters.sort}
        onChange={(event) => handleSortChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
