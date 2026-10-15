import { Card, CardContent, Typography } from "@mui/material";
import { CarImage } from "@/features/cars/components/CarImage";
import type { Car } from "@/features/cars/types/car";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  return (
    <Card>
      <CarImage car={car} />
      <CardContent>
        <Typography variant="h6" component="h2">
          {car.make} {car.model}
        </Typography>
        <Typography color="text.secondary">
          {car.year} · {car.color}
        </Typography>
      </CardContent>
    </Card>
  );
}
