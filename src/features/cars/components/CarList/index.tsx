import { Grid, Skeleton } from "@mui/material";
import { CarCard } from "@/features/cars/components/CarCard";
import type { Car } from "@/features/cars/types/car";
import { CARD_COLUMNS, ImageSkeleton, List } from "./CarList.styles";

const PLACEHOLDER_CARDS = 6;

type CarListProps = {
  cars: Car[];
};

export function CarList({ cars }: CarListProps) {
  return (
    <Grid container component={List} spacing={3}>
      {cars.map((car) => (
        <Grid key={car.id} component="li" size={CARD_COLUMNS}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
}

export function CarListSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: PLACEHOLDER_CARDS }, (_, index) => (
        <Grid key={index} size={CARD_COLUMNS}>
          <ImageSkeleton variant="rounded" />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </Grid>
      ))}
    </Grid>
  );
}
