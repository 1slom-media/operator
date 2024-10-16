import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { statusesByLabels } from "constants/statuses";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import OrderAcceptModal from "./OrderAcceptModal";

export default function OrderCard({ data, isTaken }) {
  const router = useRouter();
  const statusItem = statusesByLabels.find(
    (item) => item.status === data?.status
  );
  return (
    <Card sx={{ height: "100%", position: "relative", pb: "50px" }}>
      <Box
        component="img"
        sx={{ height: "200px", width: "100%" }}
        src={data?.image?.image?.[540]?.high}
      />
      <Stack p={1}>
        <Typography color="text.legacy" variant="body2">
          {data?.productTitle?.["uz"]}
        </Typography>
        <Stack direction="row" alignItems="center" my={1}>
          <Typography variant="body2">ID:</Typography>
          <Typography color="text.legacy" variant="body2" ml={1}>
            #{data?.number}
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="left" mb={1}>
          <Typography variant="caption">Buyurtmachi:</Typography>
          <Typography
            variant="caption"
            color="text.legacy"
            textTransform="capitalize"
          >
            {data?.name}
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="left" mb={1}>
          <Typography variant="caption">Pozitsiya:</Typography>
          <Typography
            variant="caption"
            color="text.legacy"
            textTransform="capitalize"
          >
            {data?.position}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="body2">Holati:</Typography>
          <Typography ml={1} variant="body2" color="text.legacy">
            {statusItem?.label}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        alignItems="center"
        position="absolute"
        bottom="10px"
        left="0"
        right="0"
      >
        {!isTaken ? (
          <OrderAcceptModal id={data?._id} />
        ) : (
          <Button
            onClick={() =>
              router.push(`/operator/dashboard/my-orders/${data?._id}`)
            }
            color="primary"
            startIcon={<EditIcon />}
            variant="contained"
          >
            Tahrirlash
          </Button>
        )}
      </Stack>
    </Card>
  );
}
