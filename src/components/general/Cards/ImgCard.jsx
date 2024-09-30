import { Box, Button, styled } from "@mui/material";
import DeleteIcon from "components/icons/DeleteIcon";
import React from "react";

const StyledCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  "& .btn": {
    position: "absolute",
    right: "-15px",
    top: "-15px",
    minWidth: "30px",
    maxWidth: "30px",
    maxHeight: "30px",
    minHeight: "30px",
    padding: 0,
    zIndex: 2,
    backgroundColor: theme.palette.error[400],
    color: theme.palette.text.contrastText,
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
  },
  "& .img": {
    position: "absolute",
    borderRadius: "10px",
    left: 0,
    top: 0,
    width: "100%",
    height: "110px",
    zIndex: 1,
    objectFitL: "cover",
  },
}));

const ImgCard = ({ img, obj, input: { onChange, value } }) => {
  const matchIndex = value?.indexOf(obj);
  const filtered = value?.filter((item, key) => key !== matchIndex);
  return (
    <StyledCard>
      <Box component="img" className="img" src={img} alt={img} />
      <Button
        onClick={() => onChange(filtered)}
        className="btn"
        variant="contained"
      >
        <DeleteIcon />
      </Button>
    </StyledCard>
  );
};

ImgCard.defaultProps = {
  input: { onChange: () => {}, value: [] },
};

export default ImgCard;
