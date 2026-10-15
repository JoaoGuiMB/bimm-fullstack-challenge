import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_CAR, type CreateCarInput } from "@/features/cars/api/createCar";
import type { CreateCarResult } from "@/features/cars/types/car";

function isInvalidInput(error: unknown): error is ApolloError {
  return (
    error instanceof ApolloError &&
    error.graphQLErrors.some(
      (graphQLError) => graphQLError.extensions?.code === "BAD_USER_INPUT"
    )
  );
}

export function useCreateCar() {
  const [mutate, { loading }] = useMutation(CREATE_CAR, {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "cars" });
    },
  });

  async function createCar(input: CreateCarInput): Promise<CreateCarResult> {
    try {
      const { data } = await mutate({ variables: { input } });

      return data
        ? { status: "created", car: data.createCar }
        : { status: "failed" };
    } catch (error) {
      if (isInvalidInput(error)) {
        return { status: "invalid", message: error.message };
      }

      return { status: "failed" };
    }
  }

  return { createCar, creating: loading };
}
