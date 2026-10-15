import { useQuery } from "@apollo/client";
import { GET_CARS } from "@/features/cars/api/getCars";
import type { CarFilters } from "@/features/cars/types/car";
import { sortCars } from "@/features/cars/utils/sortCars";

export function useCars({ model, year, sort }: CarFilters) {
  const { data, previousData, loading, error, refetch } = useQuery(GET_CARS, {
    variables: { model: model || null, year },
    notifyOnNetworkStatusChange: true,
  });

  const shown = data ?? previousData;

  return {
    cars: sortCars(shown?.cars ?? [], sort),
    loading: loading && !shown,
    refreshing: loading && Boolean(shown),
    error,
    retry: () => refetch(),
  };
}
