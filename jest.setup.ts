import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { db } from "@/mocks/db";
import { server } from "@/mocks/server";

configure({ asyncUtilTimeout: 3000 });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  server.resetHandlers();
  db.reset();
});

afterAll(() => server.close());
