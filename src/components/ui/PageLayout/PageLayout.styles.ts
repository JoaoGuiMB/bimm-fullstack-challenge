import { styled } from "@mui/material";

export const Header = styled("header")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  paddingBlock: theme.spacing(4),
}));

export const Main = styled("main")(({ theme }) => ({
  paddingBottom: theme.spacing(6),
}));
