import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import type { Car } from "@/features/cars/types/car";
import { BREAKPOINTS } from "@/lib/theme";
import { Image, Placeholder } from "./CarImage.styles";

type CarImageProps = {
  car: Car;
};

export function CarImage({ car }: CarImageProps) {
  const alt = `${car.year} ${car.make} ${car.model}`;

  if (!car.mobile || !car.tablet || !car.desktop) {
    return (
      <Placeholder role="img" aria-label={alt}>
        <DirectionsCarIcon fontSize="large" />
      </Placeholder>
    );
  }

  return (
    <picture>
      <source
        media={`(min-width: ${BREAKPOINTS.desktop}px)`}
        srcSet={car.desktop}
      />
      <source
        media={`(min-width: ${BREAKPOINTS.tablet}px)`}
        srcSet={car.tablet}
      />
      <Image src={car.mobile} alt={alt} />
    </picture>
  );
}
