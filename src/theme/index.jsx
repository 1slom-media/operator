import { ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import adminTheme from "./admin/baseTheme";
import darkTheme from "./darkTheme/darkTheme";

const MuiTheme = ({ children }) => {
  let theme = responsiveFontSizes(darkTheme);
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";
  theme.shadows[5] = "0px 3px 30px rgba(193, 211, 226, 0.52)";
  theme.shadows[6] = "0px 33px 40px rgba(74, 86, 254, 0.15)";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
