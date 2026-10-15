# Notes

## What I completed

- Car list from `GetCars`, with loading, error (with retry) and empty states in Material UI.
- Data fetching lives in hooks (`useCars`). Components only receive props.
- Responsive images with `<picture>`: the browser picks `mobile`, `tablet` or `desktop` by viewport and switches as the window resizes. Cars without image URLs show a placeholder at the same size.
- "Add car" dialog using `CreateCar`. Blank make or model and a missing or non-numeric year are caught before sending, and a `BAD_USER_INPUT` from the server shows inside the dialog.
- Search by model and filter by year, sent to `GetCars` as variables so filtering happens on the server. Both inputs are debounced by 300ms.
- Sort by model or year. Sorting happens on the client because the API has no sort argument.
- `useCarFilters()` keeps the filters in the URL, so they survive a reload and coming back from the detail page.
- Detail page at `/cars/:id` using `GetCar`, with loading, error and not-found states. "Back to inventory" goes back in history when you came from the list, so your filters are kept, and links to `/` on a direct visit.
- Accessibility basics: labelled controls, alt text, `header`/`main` landmarks, one `h1` per page, cards as keyboard-focusable links, and MUI's dialog focus handling.

## What I left out, and why

- Image URL fields in the form. The API makes them optional, and three free-text URL fields would invite broken images, since the contract doesn't validate them and the only images that exist are the seed SVGs. In a real inventory the images would be uploaded and the URLs assigned by the server. Until then, created cars show a placeholder sized like the real images so the grid stays even.
- Client rules the API doesn't have. There's no year range and color can be blank, because the contract allows both.
- Server-side sorting. The API has no sort argument and the mock belongs to another team, so I sort on the client.
- A not-found route for unknown URLs. The brief doesn't ask for one.
- React Query and Zustand. See the Apollo point under decisions.
- A form library. Four fields didn't justify React Hook Form or Zod.

## Decisions and trade-offs

- Folder structure follows the suggested bulletproof-react layout. Each component is a folder whose `index.tsx` holds it, with its styles and tests beside it, so imports read `@/features/cars/components/CarList`. There are no barrel files.
- Apollo is the only state library. React Query would be a second cache for the same server data, and the rest of the state belongs to one page or one form, so Zustand or Redux would add a concept without removing one.
- The look is Material UI's default theme in dark mode, with Roboto loaded in `index.html`. Styling goes through the theme and `styled()` parts next to each component. No `sx`, inline styles or system props. The theme's breakpoints are set to the brief's 640px and 1024px, so the grid and the images change at the same widths. The theme sits in `src/lib/` because features import it and features never import from `app/`.
- After creating a car I evict the `cars` field from the Apollo cache. A new car can match any number of cached filters and only the server knows which, so every list refetches. `refetchQueries` alone left other filters stale, and a test covers that.
- The mock returns no `__typename`, so Apollo can't normalise cars. That's why each query lists its fields and the detail page always fetches.
- Image URLs are typed `string | null` although the schema says `String!`. `CreateCarInput` makes them optional and the mock returns created cars without them. The form sends them as `null` explicitly, so the cache never receives a result with missing fields.
- Filters live in the URL rather than component state, because the detail page made the back button matter. Updates replace the history entry so typing doesn't fill it.
- While a new filter loads, the previous results stay on screen under a thin progress bar instead of flashing the skeleton on every keystroke.
- Tests run against the mock API through MSW with the real Apollo client and assert what a user sees. They cover the list, images, errors and retry, search, sort, filters, creating a car (including a rejected and a failed save), the cache eviction, the detail page and going back to a filtered list. `validateCarForm` has its own unit tests because its edge cases are cheaper to pin down there. I kept the suite small to stay inside the time box; the rest is listed below.

## If I had another day

1. A not-found route for unknown URLs.
2. End-to-end tests with Playwright for the main user flows: browse, search, add a car, open it and go back. So these would also check that the image really switches at 640px and 1024px, and that the keyboard flow works in a real browser.
3. Unit tests for `sortCars` and `toCreateCarInput`.
4. `useDebouncedValue` with fake timers.
5. Separate tests for `useCars`, `useCar` and each `useCreateCar` outcome.
6. Detail page error and retry.
7. If the list ever grows enough to paginate, ask the API team for a sort argument, since client-side sorting only works when the client holds every car.

## Anything you should know to run it

`npm install && npm run dev`.
