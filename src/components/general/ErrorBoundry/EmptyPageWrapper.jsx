import { Card } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const EmptyPageWrapper = ({ children }) => {
  return (
    <Stack
      height="73vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
      bgcolor="#fff"
      borderRadius="20px"
    >
      {children}
    </Stack>
  );
};

export default EmptyPageWrapper;
