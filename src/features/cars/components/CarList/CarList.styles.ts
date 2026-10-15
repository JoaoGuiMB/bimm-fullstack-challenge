import { Skeleton, styled } from "@mui/material";

export const CARD_COLUMNS = { xs: 12, sm: 6, md: 4 };

export const List = styled("ul")({
  listStyle: "none",
  margin: 0,
  padding: 0,
});

export const ImageSkeleton = styled(Skeleton)(({ theme }) => ({
  height: "auto",
  aspectRatio: "16 / 9",
  marginBottom: theme.spacing(1),
}));
