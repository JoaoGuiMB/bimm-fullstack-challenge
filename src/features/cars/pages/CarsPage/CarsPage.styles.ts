import { LinearProgress, styled } from "@mui/material";

export const RefreshIndicator = styled(LinearProgress)({
  position: "absolute",
  insetInline: 0,
  top: 0,
});

export const Results = styled("div")(({ theme }) => ({
  position: "relative",
  paddingTop: theme.spacing(1),
}));
