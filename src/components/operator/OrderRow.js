import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Avatar, Fab, Stack, Typography } from "@mui/material";
import { getCity } from "utils/helpers";
import OrderAcceptModal from "./OrderAcceptModal";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
import { statusesByLabels } from "constants/statuses";

export default function OrderRow({ data, isTaken }) {
  const router = useRouter();
  const statusItem = statusesByLabels.find(
    (item) => item.status === data?.status
  );
  return (
    <TableRow
      key={data?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Stack gap={2} direction="row" alignItems="center">
          <Avatar src={data?.image} />
          <Stack>
            <Typography variant="body2" color="text.legacy">
              {data?.productName}
            </Typography>
            <Typography
              color="text.legacy"
              sx={{ fontSize: "11px", fontWeight: "900" }}
            >{`#${data?.number}`}</Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" color="text.legacy">{data?.name}</Typography>
      </TableCell>
      <TableCell align="center">{getCity(data?.city_id)}</TableCell>
      <TableCell align="center">
        <Chip
          label={statusItem.label}
          sx={{ background: statusItem.color, color: "#fff", width: "150px" }}
        />
      </TableCell>
      <TableCell align="center">
        <Stack alignItems="center">
          {!isTaken ? (
            <OrderAcceptModal id={data?._id} />
          ) : (
            <Fab
              onClick={() =>
                router.push(`/operator/dashboard/my-orders/${data?._id}`)
              }
              color="primary"
              size="small"
            >
              <EditIcon />
            </Fab>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
