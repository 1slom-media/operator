import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const AdminCard = styled(Card)({
  position: "relative",
  padding: "1.5rem 1.75rem",
  height: "100%",
  borderRadius: "20px",
  boxShadow: "none",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem",
  },
});

export default AdminCard;
