import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: "16px",
    },
  },
  palette: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
