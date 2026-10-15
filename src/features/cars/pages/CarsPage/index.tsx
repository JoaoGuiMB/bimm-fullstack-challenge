import { Button } from "@mui/material";
import { PageLayout } from "@/components/ui/PageLayout";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { CarList, CarListSkeleton } from "@/features/cars/components/CarList";
import { useCars } from "@/features/cars/hooks/useCars";
import type { Car } from "@/features/cars/types/car";

type CarResultsProps = {
  cars: Car[];
  loading: boolean;
  error?: Error;
  onRetry: () => void;
};

function CarResults({ cars, loading, error, onRetry }: CarResultsProps) {
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

  if (cars.length === 0) {
    return (
      <StatusMessage
        title="No cars yet"
        description="Cars you add will show up here."
      />
    );
  }

  return <CarList cars={cars} />;
}

export function CarsPage() {
  const { cars, loading, error, retry } = useCars();

  return (
    <PageLayout title="Car inventory">
      <CarResults cars={cars} loading={loading} error={error} onRetry={retry} />
    </PageLayout>
  );
}
