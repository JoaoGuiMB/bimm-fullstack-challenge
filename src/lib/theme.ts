import { createTheme } from "@mui/material";

export const BREAKPOINTS = { tablet: 640, desktop: 1024 };

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: BREAKPOINTS.tablet,
      md: BREAKPOINTS.desktop,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiTextField: { defaultProps: { fullWidth: true } },
  },
});
