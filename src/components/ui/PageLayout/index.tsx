import { Container, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Header, Main } from "./PageLayout.styles";

type PageLayoutProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageLayout({ title, actions, children }: PageLayoutProps) {
  return (
    <Container maxWidth="lg">
      <Header>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {actions}
      </Header>
      <Main>{children}</Main>
    </Container>
  );
}
