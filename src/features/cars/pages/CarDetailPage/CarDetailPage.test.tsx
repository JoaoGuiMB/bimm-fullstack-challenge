import { AppRoutes } from "@/app/router";
import { seedCars } from "@/mocks/seed";
import { renderWithProviders, screen } from "@/test/renderWithProviders";

const [Q5] = seedCars;

describe("CarDetailPage", () => {
  it("shows the car", async () => {
    renderWithProviders(<AppRoutes />, { route: `/cars/${Q5.id}` });

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: `${Q5.make} ${Q5.model}`,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(Q5.color)).toBeInTheDocument();
  });

  it("explains when the car does not exist", async () => {
    renderWithProviders(<AppRoutes />, { route: "/cars/unknown" });

    expect(await screen.findByText("Car not found")).toBeInTheDocument();
  });
});
