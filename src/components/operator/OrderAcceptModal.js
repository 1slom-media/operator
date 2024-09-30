import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { Button, IconButton, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getOrdersStream, saveStreamOrder } from "redux-store/orders/new.slice";
import { useDispatch, useSelector } from "react-redux";

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

export default function OrderAcceptModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.stream.isSaveLoading);

  const callback = () => {
    handleClose();
    dispatch(getOrdersStream({ server, token }));
  };

  return (
    <div>
      <Button
        startIcon={<CallReceivedIcon />}
        variant="contained"
        onClick={handleOpen}
        sx={{ width: "100%" }}
      >
        QABUL QILISH
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
            Siz ushbu buyurtmani qabul qilmoqchisiz!!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="caption"
            color="text.legacy"
            sx={{ mt: 3, p: 2, textAlign: "justify" }}
          >
            Buyurtmani qabul qilib barcha masuliyatni o'z bo'yningizga olgan
            hisoblanasiz. Agar buyurtma vaqtida gaplashilinmasa jarimaga
            tortilishingiz mumkin.
          </Typography>
          <Stack mt={3}>
            <LoadingButton
              loading={isLoading}
              onClick={() =>
                dispatch(saveStreamOrder({ token, server, _id: id, callback }))
              }
              variant="contained"
            >
              Qabul qilish
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
