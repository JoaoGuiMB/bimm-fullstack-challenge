import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Car } from "@/features/cars/types/car";

export type GetCarsData = {
  cars: Car[];
};

export const GET_CARS: TypedDocumentNode<GetCarsData> = gql`
  query GetCars {
    cars {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;
