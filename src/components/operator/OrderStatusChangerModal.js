import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getStatusText } from "utils/helpers";
import { updateOrderStatus } from "redux-store/admin/orders/orders.slice";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

export default function OrderStatusModal({ id, status, title, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.admin.isStatusUpdateLoading);
  const router = useRouter();

  const callback = () => {
    dispatch(updateOrderStatus({ server, token, status, id, router }));
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} {...rest}>
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="body1"
            color="text.legacy"
            component="h2"
          >
            Buyurtma holati o'zgartirilmoqda
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="caption"
            color="text.legacy"
            sx={{ mt: 3, textAlign: "justify" }}
          >
            Joriy buyurtma holati{" "}
            <span style={{ color: "red" }}>{getStatusText(status)}</span>{" "}
            holatiga o'zgartirilmoqda.
          </Typography>
          <Stack
            mt={3}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button onClick={handleClose} variant="outlined" color="error">
              Bekor qilish
            </Button>
            <LoadingButton
              loading={isLoading}
              onClick={callback}
              variant="contained"
            >
              Tasdiqlayman
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
