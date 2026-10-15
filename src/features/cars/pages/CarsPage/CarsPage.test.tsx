import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { AppRoutes } from "@/app/router";
import { server } from "@/mocks/server";
import { seedCars } from "@/mocks/seed";
import {
  renderWithProviders,
  screen,
  within,
} from "@/test/renderWithProviders";

const [Q5] = seedCars;

function carHeading(car: { make: string; model: string }) {
  return { name: `${car.make} ${car.model}` };
}

describe("CarsPage", () => {
  it("lists the cars from the API", async () => {
    renderWithProviders(<AppRoutes />);

    const list = await screen.findByRole("list");

    expect(within(list).getAllByRole("listitem")).toHaveLength(seedCars.length);
    expect(screen.getByRole("heading", carHeading(Q5))).toBeInTheDocument();
  });

  it("serves each image per breakpoint", async () => {
    const { container } = renderWithProviders(<AppRoutes />);

    const image = await screen.findByRole("img", {
      name: `${Q5.year} ${Q5.make} ${Q5.model}`,
    });
    const sources = container.querySelectorAll(
      `source[srcset="${Q5.desktop}"], source[srcset="${Q5.tablet}"]`
    );

    expect(image).toHaveAttribute("src", Q5.mobile);
    expect([...sources].map((source) => source.getAttribute("media"))).toEqual([
      "(min-width: 1024px)",
      "(min-width: 640px)",
    ]);
  });

  it("shows an error and recovers on retry", async () => {
    const user = userEvent.setup();
    server.use(
      graphql.query(
        "GetCars",
        () => HttpResponse.json({ errors: [{ message: "unavailable" }] }),
        { once: true }
      )
    );
    renderWithProviders(<AppRoutes />);

    await user.click(await screen.findByRole("button", { name: "Retry" }));

    expect(
      await screen.findByRole("heading", carHeading(Q5))
    ).toBeInTheDocument();
  });
});
