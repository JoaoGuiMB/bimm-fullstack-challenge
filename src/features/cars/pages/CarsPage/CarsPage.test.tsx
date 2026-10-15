import userEvent, { type UserEvent } from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { AppRoutes } from "@/app/router";
import { server } from "@/mocks/server";
import { seedCars } from "@/mocks/seed";
import {
  renderWithProviders,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@/test/renderWithProviders";

const [Q5, A3, , ETRON_GT, A6, Q3] = seedCars;

const NEW_CAR = { make: "Tesla", model: "Model 3", year: "2024" };

function carHeading(car: { make: string; model: string }) {
  return { name: `${car.make} ${car.model}` };
}

async function submitNewCar(user: UserEvent) {
  await user.click(await screen.findByRole("button", { name: "Add car" }));

  const dialog = screen.getByRole("dialog");

  await user.type(within(dialog).getByLabelText(/make/i), NEW_CAR.make);
  await user.type(within(dialog).getByLabelText(/model/i), NEW_CAR.model);
  await user.type(within(dialog).getByLabelText(/year/i), NEW_CAR.year);
  await user.click(within(dialog).getByRole("button", { name: "Save" }));
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

  it("explains when the filters match no cars", async () => {
    renderWithProviders(<AppRoutes />, { route: "/?model=no-such-model" });

    expect(
      await screen.findByText("No cars match your filters")
    ).toBeInTheDocument();
  });

  it("shows only the cars whose model matches the search", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);
    await screen.findByRole("heading", carHeading(A3));

    await user.type(screen.getByLabelText("Search by model"), "q");
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", carHeading(A3))
    );

    const list = screen.getByRole("list");

    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", carHeading(Q5))).toBeInTheDocument();
    expect(screen.getByRole("heading", carHeading(Q3))).toBeInTheDocument();
  });

  it("sorts the cars from oldest to newest", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);
    await screen.findByRole("heading", carHeading(Q5));

    await user.click(screen.getByRole("combobox", { name: "Sort by" }));
    await user.click(screen.getByRole("option", { name: "Oldest first" }));

    const headings = within(screen.getByRole("list")).getAllByRole("heading");

    expect(headings[0]).toHaveTextContent(carHeading(A6).name);
    expect(headings[headings.length - 1]).toHaveTextContent(
      carHeading(ETRON_GT).name
    );
  });

  it("adds a created car to the list", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);

    await submitNewCar(user);

    expect(
      await screen.findByRole("heading", carHeading(NEW_CAR))
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows a car created under another filter once the filter is cleared", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);
    await screen.findByRole("heading", carHeading(Q5));
    const search = screen.getByLabelText("Search by model");

    await user.type(search, A3.model);
    await waitForElementToBeRemoved(() =>
      screen.queryByRole("heading", carHeading(Q5))
    );
    await submitNewCar(user);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    await user.clear(search);

    expect(
      await screen.findByRole("heading", carHeading(NEW_CAR))
    ).toBeInTheDocument();
  });

  it("flags blank fields without sending the form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppRoutes />);

    await user.click(await screen.findByRole("button", { name: "Add car" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Save" }));

    expect(within(dialog).getByText("Enter a make")).toBeInTheDocument();
    expect(within(dialog).getByText("Enter a model")).toBeInTheDocument();
    expect(within(dialog).getByLabelText(/make/i)).toHaveFocus();
  });

  it("shows the server's rejection inside the dialog", async () => {
    const user = userEvent.setup();
    const rejection = "make and model are required";
    server.use(
      graphql.mutation("CreateCar", () =>
        HttpResponse.json({
          errors: [
            { message: rejection, extensions: { code: "BAD_USER_INPUT" } },
          ],
        })
      )
    );
    renderWithProviders(<AppRoutes />);

    await submitNewCar(user);

    expect(
      await within(screen.getByRole("dialog")).findByText(rejection)
    ).toBeInTheDocument();
  });

  it("keeps the values and offers a retry when saving fails", async () => {
    const user = userEvent.setup();
    server.use(graphql.mutation("CreateCar", () => HttpResponse.error()));
    renderWithProviders(<AppRoutes />);

    await submitNewCar(user);

    const dialog = screen.getByRole("dialog");

    expect(
      await within(dialog).findByText("Couldn't save the car. Try again.")
    ).toBeInTheDocument();
    expect(within(dialog).getByLabelText(/make/i)).toHaveValue(NEW_CAR.make);
  });
});
