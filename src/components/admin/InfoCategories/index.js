import { Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import uz from "date-fns/locale/uz";

const AdminCategoryView = ({ uid, createdAt, updatedAt, __v }) => {
  return (
    <Stack width="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          UID
        </Typography>
        <Typography variant="string" color="secondary.100">
          {uid}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          Yangilanishlar soni
        </Typography>
        <Typography variant="string" color="secondary.100">
          {__v ? __v : "yangilanmgan"}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          Soni
        </Typography>
        <Typography variant="string" color="secondary.100">
          20 dona
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          Yaratilgan vaqti
        </Typography>
        <Typography variant="string" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : null}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          Yangilangan vaqti
        </Typography>
        <Typography variant="string" color="secondary.100">
          {updatedAt
            ? format(new Date(updatedAt), "dd-MMMM, HH:mm", { locale: uz })
            : null}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AdminCategoryView;