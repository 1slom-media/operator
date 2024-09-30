import { Chip, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPaymentStatus } from "redux-store/admin/customers/customers.slice";
import { getColor, getStatusText, userPaymentStatus } from "utils/helpers";

const PaymentFilter = ({ currStatus = {}, status }) => {
  const dispatch = useDispatch();
  const curr = useSelector((state) => state.customers.paymentStatusFilter);

  return (
    <Stack direction="row" justifyContent="flex-start" gap="10px">
      {status?.map((sts) => {
        if (sts in currStatus) {
          return (
            <Chip
              key={sts}
              size="small"
              label={`${getStatusText(sts)} ${currStatus[sts]}`}
              onClick={() => dispatch(setPaymentStatus(sts))}
              variant={curr === sts ? "outlined" : "contained"}
              sx={{
                p: "1rem 0.8rem",
                fontSize: 14,
                color: !!getColor(sts) ? `${getColor(sts)}.900` : "inherit",
                border: `1p solid ${getColor(sts)}.900`,
                backgroundColor:
                  `${!!getColor(sts)}.200` && curr !== sts
                    ? `${getColor(sts)}.200`
                    : "none",
              }}
            />
          );
        }
      })}
    </Stack>
  );
};

export default PaymentFilter;
