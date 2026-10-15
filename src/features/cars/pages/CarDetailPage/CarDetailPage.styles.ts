import { Card, Skeleton, styled } from "@mui/material";

export const DetailCard = styled(Card)({
  overflow: "hidden",
});

export const Details = styled("dl")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: theme.spacing(1, 3),
  margin: 0,
  padding: theme.spacing(3),
  "& dt": { color: theme.palette.text.secondary },
  "& dd": { margin: 0 },
}));

export const ImageSkeleton = styled(Skeleton)({
  height: "auto",
  aspectRatio: "2 / 1",
});
