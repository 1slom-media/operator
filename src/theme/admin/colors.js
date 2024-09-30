const primary = {
  main: "#0085FF",
  light: "#5EB2FF",
  100: "rgba(66, 150, 255, 0.53)",
  200: "#ECF3F7",
  900: "#092C4C",
  contrastText: "#FFFFFF",
};

const secondary = {
  main: "#7897B3",
  dark: "#4F4F4F",
  contrastText: "#FFFFFF",
  lightGrey: "#7b90a1",
  100: "#092C4C",
  200: "#ECEFF1",
  900: "#7E92A2",
};

const light = {
  main: "#ffffff",
  contrastText: "#0085FF",
};

const success = {
  main: "#00CC99",
  light: "#D7F5EA",
  dark: "#0E8074",
  contrastText: "#FFFFFF",
  100: "#E7F9ED",
  200: "#C2F1D1",
  300: "#99E8B3",
  400: "#52D77E",
  500: "#33D067",
  600: "#2ECB5F",
  700: "#27C454",
  800: "#20BE4A",
  900: "#0b7724",
};

const neutral = {
  main: "rgba(86, 106, 127, 0.1)",
  100: "rgba(60, 81, 134, 0.5)",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
  1000: "#EAEEF4",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: "#FFFFFF",
  50: "#f3f5f9",
  100: "#DBF0FE",
  200: "#B8DEFE",
  300: "#94C9FE",
  400: "#7AB6FD",
  500: "#4E97FD",
  600: "#3975D9",
  700: "#2756B6",
  800: "#183C92",
  900: "#0E2979",
};

const warning = {
  main: "#F2C94C",
  light: "#F0EBDB",
  dark: "#B27B16",
  contrastText: "#FFFFFF",
  100: "#fff9c4",
  200: "#FCF8D9",
  300: "#fff176",
  400: "#ffee58",
  500: "#ffeb3b",
  600: "#fdd835",
  700: "#fbc02d",
  800: "#f9a825",
  900: "#E9D100",
  contrastText: "#FFFFFF",
};

const error = {
  main: "#EB5757",
  light: "#EFE1E1",
  dark: "#922E2E",
  contrastText: "#FFFFFF",
  100: "#FFEAEA",
  200: "#FFCBCB",
  300: "#FFA9A9",
  400: "#FF6D6D",
  500: "#FF5353",
  600: "#FF4C4C",
  700: "#FF4242",
  800: "#FF3939",
  900: "#FF2929",
};

const text = {
  primary: "rgba(0, 0, 0, 0.6)",
  secondary: "#566A7F",
  disabled: "rgba(55, 65, 81, 0.48)",
  legacy: "#112152",
  legacyLight: "#152C70",
  black: "#000000",
  lightGray: "rgba(86, 106, 127, 0.6)",
  profile: "#3C5186",
  green: "#01BA35",
  lightGreen: "#9999CC",
  placeholder: "#BFC1DA",
  lightWarning: "#FFBA33",
  lightYellow: "#FFBA33",
  light: "#A2A0B3",
  lightMain: "#74708E",
};

const background = {
  main: "#fff",
  default: "#F9FAFC",
  paper: "#FFFFFF",
  gray: " #E9F1F5",
  dargGray: "#566A7F",
  lightGray: "#F8FCFD",
  iconButton: "rgba(255, 168, 0, 0.19)",
  iconButtonLight: "#EEEEEE",
  inputGray: "#EDF2F4",
  lightGrayVery: "#F7F8FA",
  paleYellow: "rgba(252, 238, 165, 0.21)",
  cartBg: "#F7F8FA",
  card: "rgba(0, 0, 0, 0.1)",
  start: "#5EB2FF",
  end: "#076FCE",
  quill: "#F3F3F6",
  filter: "#E5EBF1",
  btns: "#7897B2",
  blue: "rgba(0, 133, 255, 0.1)",
  lightBlue: "#F6F6FC",
  lightYellow: "#F4F4ED",
  hover:
    "linear-gradient(0deg, rgba(211, 204, 189, 0.43), rgba(211, 204, 189, 0.43))",
  100: "#F6F7F9",
  200: "#ECF3F8",
  300: "#CBEDFE",
  400: "#092C4C",
};

const blue = {
  main: "#5458F7",
  light: "#E0E1F1",
  dark: "#29B8F5",
  contrastText: "#FFFFFF",
  100: "#4296FF",
  200: "#EEF6FB",
};

const black = {
  main: "#000000",
  dark: "#000",
  light: "",
};

const disabled = {
  main: "#C4C2BF",
  contrastText: "#ffffff",
  100: "rgba(126, 146, 162, 0.2)",
  200: "#E5EBF1",
};

const divider = "#E6E8F0";

export const palette = {
  light: light,
  primary: primary,
  secondary: secondary,
  success: success,
  info: info,
  warning: warning,
  error: error,
  text: text,
  divider: divider,
  background: background,
  neutral: neutral,
  blue: blue,
  black: black,
  disabled: disabled,
  action: {
    active: neutral[500],
    focus: "rgba(55, 65, 81, 0.12)",
    hover: "rgba(55, 65, 81, 0.04)",
    selected: "rgba(55, 65, 81, 0.08)",
    disabledBackground: "rgba(55, 65, 81, 0.12)",
    disabled: "rgba(55, 65, 81, 0.26)",
  },
};
