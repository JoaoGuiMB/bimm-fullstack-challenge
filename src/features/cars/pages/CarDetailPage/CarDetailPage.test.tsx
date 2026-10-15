import userEvent from "@testing-library/user-event";
import { AppRoutes } from "@/app/router";
import { seedCars } from "@/mocks/seed";
import { renderWithProviders, screen } from "@/test/renderWithProviders";

const [Q5, A3] = seedCars;

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

  it("goes back to the filtered list it was opened from", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />, { route: `/?model=${A3.model}` });

    await user.click(
      await screen.findByRole("link", { name: new RegExp(A3.model) })
    );
    await screen.findByRole("heading", {
      level: 1,
      name: `${A3.make} ${A3.model}`,
    });
    await user.click(screen.getByRole("button", { name: "Back to inventory" }));

    expect(await screen.findByLabelText("Search by model")).toHaveValue(
      A3.model
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
});
