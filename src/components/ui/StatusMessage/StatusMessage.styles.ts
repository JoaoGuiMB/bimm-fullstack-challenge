import { Paper, styled } from "@mui/material";

export const Panel = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(6, 3),
  textAlign: "center",
}));

export const ActionSlot = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
