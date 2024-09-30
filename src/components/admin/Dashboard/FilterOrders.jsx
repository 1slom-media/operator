import { Box, Chip, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColor, getStatusText } from "utils/helpers";
import {
  getOrdersByStatus,
  setOrderFilter,
} from "redux-store/admin/orders/orders.slice";

export default function FilterWrapper({
  currStatus,
  statusCount,
  loading,
  page,
}) {
  const status = [
    "new",
    "ready",
    "onway",
    "delivered",
    "pending",
    "canceled",
    "hold",
    "archived",
  ];
  const token = useSelector((state) => state.auth.token);
  const orderFilter = useSelector((state) => state.orders.statusFilter);
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: "100%", overflowX: "auto", padding: "1.5rem 1.75rem" }}>
      <Stack direction="row" justifyContent="flex-start" gap="10px">
        {status.map((sts) => {
          return (
            <Chip
              key={sts}
              size="small"
              onClick={() => {
                dispatch(setOrderFilter(sts));
              }}
              label={`${getStatusText(sts)} ${
                orderFilter === sts && !loading ? `(${statusCount})` : ""
              }`}
              variant={orderFilter === sts ? "outlined" : "contained"}
              sx={{
                p: "1rem 0.8rem",
                fontSize: 14,
                color: !!getColor(sts) ? `${getColor(sts)}.900` : "inherit",
                border: "1p solid red",
                backgroundColor: `${!!getColor(sts)}.200`
                  ? `${getColor(sts)}.200`
                  : "none",
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
