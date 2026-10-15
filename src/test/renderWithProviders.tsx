import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { createApolloClient } from "@/lib/apollo";
import { theme } from "@/lib/theme";

type RenderWithProvidersOptions = Omit<RenderOptions, "wrapper"> & {
  route?: string;
};

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", ...options }: RenderWithProvidersOptions = {}
) {
  const client = createApolloClient();

  function Providers({ children }: { children: ReactNode }) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </ThemeProvider>
      </ApolloProvider>
    );
  }

  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";
