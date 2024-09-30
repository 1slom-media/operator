import { Button, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import {
  getNotificationByDay,
  getTodaysNotifications,
  getYesterdaysNotifications,
} from "utils/helpers";
import NotificationItem from "./NotificationItem";

const NotificationWrapper = ({ data }) => {
  const router = useRouter();
  const todays = getTodaysNotifications(data);
  const yesterdays = getYesterdaysNotifications(data);
  const byDate = getNotificationByDay(data);
  return (
    <Stack direction="column">
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Bugun
        </Typography>
      </Stack>
      {todays?.map((item) => (
        <NotificationItem key={item.createdAt} {...item} />
      ))}
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Kecha
      </Typography>
      {yesterdays?.map((item) => (
        <NotificationItem key={item.createdAt} {...item} />
      ))}
      <Divider sx={{ my: 1 }} />

      <Button
        color="info"
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() => router.push("/admin/notifications")}
      >
        Barchasini ko&apos;rish
      </Button>
    </Stack>
  );
};

export default NotificationWrapper;
