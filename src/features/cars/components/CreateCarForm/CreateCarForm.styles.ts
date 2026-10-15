import { styled } from "@mui/material";

export const Form = styled("form")(({ theme }) => ({
  paddingTop: theme.spacing(1),
}));

export const Actions = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));
