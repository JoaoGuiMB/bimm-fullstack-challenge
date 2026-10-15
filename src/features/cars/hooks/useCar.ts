import { useQuery } from "@apollo/client";
import { GET_CAR } from "@/features/cars/api/getCar";

export function useCar(id: string) {
  const { data, loading, error, refetch } = useQuery(GET_CAR, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  return {
    car: data?.car ?? null,
    loading,
    error,
    retry: () => refetch(),
  };
}
