import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Car } from "@/features/cars/types/car";

export type CreateCarInput = {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string | null;
  tablet: string | null;
  desktop: string | null;
};

export type CreateCarData = {
  createCar: Car;
};

export type CreateCarVariables = {
  input: CreateCarInput;
};

export const CREATE_CAR: TypedDocumentNode<CreateCarData, CreateCarVariables> =
  gql`
    mutation CreateCar($input: CreateCarInput!) {
      createCar(input: $input) {
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
