import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { apolloClient } from "@/lib/apollo";
import { theme } from "@/lib/theme";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
