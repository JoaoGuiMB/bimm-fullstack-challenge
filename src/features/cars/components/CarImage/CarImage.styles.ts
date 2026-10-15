import { styled } from "@mui/material";

export const Image = styled("img")({
  display: "block",
  width: "100%",
  height: "auto",
});

export const Placeholder = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  aspectRatio: "640 / 420",
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.action.hover,
  [theme.breakpoints.up("sm")]: { aspectRatio: "1024 / 576" },
  [theme.breakpoints.up("md")]: { aspectRatio: "1600 / 800" },
}));
