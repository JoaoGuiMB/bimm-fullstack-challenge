import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/ui/PageLayout";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { CarImage } from "@/features/cars/components/CarImage";
import { useCar } from "@/features/cars/hooks/useCar";
import type { Car } from "@/features/cars/types/car";
import { DetailCard, Details, ImageSkeleton } from "./CarDetailPage.styles";

function BackToInventory() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.key === "default") {
    return (
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
        Back to inventory
      </Button>
    );
  }

  return (
    <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
      Back to inventory
    </Button>
  );
}

type CarDetailsProps = {
  car: Car | null;
  loading: boolean;
  error?: Error;
  onRetry: () => void;
};

function CarDetails({ car, loading, error, onRetry }: CarDetailsProps) {
  if (loading) return <ImageSkeleton variant="rounded" />;

  if (error) {
    return (
      <StatusMessage
        title="Couldn't load this car"
        description="Check your connection and try again."
        action={<Button onClick={onRetry}>Retry</Button>}
      />
    );
  }

  if (!car) {
    return (
      <StatusMessage
        title="Car not found"
        description="It may have been removed, or the link is wrong."
      />
    );
  }

  return (
    <DetailCard>
      <CarImage car={car} />
      <Details>
        <dt>Make</dt>
        <dd>{car.make}</dd>
        <dt>Model</dt>
        <dd>{car.model}</dd>
        <dt>Year</dt>
        <dd>{car.year}</dd>
        <dt>Color</dt>
        <dd>{car.color}</dd>
      </Details>
    </DetailCard>
  );
}

export function CarDetailPage() {
  const { id = "" } = useParams();
  const { car, loading, error, retry } = useCar(id);

  return (
    <PageLayout
      title={car ? `${car.make} ${car.model}` : "Car details"}
      actions={<BackToInventory />}
    >
      <CarDetails car={car} loading={loading} error={error} onRetry={retry} />
    </PageLayout>
  );
}
