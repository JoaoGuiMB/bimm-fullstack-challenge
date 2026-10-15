import { useQuery } from "@apollo/client";
import { GET_CARS } from "@/features/cars/api/getCars";

export function useCars() {
  const { data, loading, error, refetch } = useQuery(GET_CARS, {
    notifyOnNetworkStatusChange: true,
  });

  return {
    cars: data?.cars ?? [],
    loading,
    error,
    retry: () => refetch(),
  };
}
