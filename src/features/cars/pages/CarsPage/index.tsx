import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { PageLayout } from "@/components/ui/PageLayout";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { CarFiltersBar } from "@/features/cars/components/CarFiltersBar";
import { CarList, CarListSkeleton } from "@/features/cars/components/CarList";
import { CreateCarDialog } from "@/features/cars/components/CreateCarDialog";
import { useCarFilters } from "@/features/cars/hooks/useCarFilters";
import { useCars } from "@/features/cars/hooks/useCars";
import type { Car } from "@/features/cars/types/car";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { RefreshIndicator, Results } from "./CarsPage.styles";

const FILTER_DELAY_MS = 300;

type CarResultsProps = {
  cars: Car[];
  loading: boolean;
  error?: Error;
  filtered: boolean;
  onRetry: () => void;
  onAddCar: () => void;
};

function CarResults({
  cars,
  loading,
  error,
  filtered,
  onRetry,
  onAddCar,
}: CarResultsProps) {
  if (loading) return <CarListSkeleton />;

  if (error) {
    return (
      <StatusMessage
        title="Couldn't load cars"
        description="Check your connection and try again."
        action={<Button onClick={onRetry}>Retry</Button>}
      />
    );
  }

  if (cars.length === 0 && filtered) {
    return (
      <StatusMessage
        title="No cars match your filters"
        description="Try a different model or year."
      />
    );
  }

  if (cars.length === 0) {
    return (
      <StatusMessage
        title="No cars yet"
        description="Cars you add will show up here."
        action={<Button onClick={onAddCar}>Add car</Button>}
      />
    );
  }

  return <CarList cars={cars} />;
}

export function CarsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { filters, setModel, setYear, setSort } = useCarFilters();
  const model = useDebouncedValue(filters.model, FILTER_DELAY_MS);
  const year = useDebouncedValue(filters.year, FILTER_DELAY_MS);
  const { cars, loading, refreshing, error, retry } = useCars({
    model,
    year,
    sort: filters.sort,
  });

  const openDialog = () => setDialogOpen(true);

  return (
    <PageLayout
      title="Car inventory"
      actions={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openDialog}
        >
          Add car
        </Button>
      }
    >
      <Stack spacing={3}>
        <CarFiltersBar
          filters={filters}
          onModelChange={setModel}
          onYearChange={setYear}
          onSortChange={setSort}
        />
        <Results>
          {refreshing && <RefreshIndicator />}
          <CarResults
            cars={cars}
            loading={loading}
            error={error}
            filtered={model !== "" || year !== null}
            onRetry={retry}
            onAddCar={openDialog}
          />
        </Results>
      </Stack>
      <CreateCarDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </PageLayout>
  );
}
