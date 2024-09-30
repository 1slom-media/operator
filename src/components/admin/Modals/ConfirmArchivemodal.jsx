import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import ArchieveOutlined from "components/icons/ArchieveOutlined";
import useAlert from "hooks/useAlert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersByStatus,
  updateOrder,
} from "redux-store/admin/orders/orders.slice";
import { StyledEditeBtn } from "../TableRows/ProductsRow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const ConfirmArchivemodal = ({ error, status, id, prevStatus, page }) => {
  const { statusFilter } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isLoading = useSelector((state) => state.orders.isUpdateLoading);
  const server = useSelector((state) => state.settings.site_server);
  const alert = useAlert();

  const callBack = () => {
    if (success) {
      alert.success({
        title: "Buyurtma",
        text: status == "archived" ? "Arxivdan chiqarildi" : "Arxivlandi",
      });
      handleClose();
      dispatch(
        getOrdersByStatus({
          token,
          params: {
            status: statusFilter,
            filter: filterValue,
            limit: 7,
            page: page,
          },
          server,
        })
      );
    } else {
      handleClose();
      alert.error({
        title: "Buyurtma",
        text: "Xatolik yuz berdi",
      });
    }
  };

  const moveToArchive = () => {
    dispatch(
      updateOrder({
        token,
        params: { data: { status: "archived" }, id, callBack },
        server,
      })
    );
  };

  const moveToPrevious = () => {
    dispatch(
      updateOrder({
        token,
        params: { data: { status: prevStatus }, id, callBack },
        server,
      })
    );
  };

  return (
    <div>
      <StyledEditeBtn onClick={handleOpen}>
        <ArchieveOutlined />
      </StyledEditeBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Stack
              width="150px"
              height="150px"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              bgcolor="background.iconButtonLight"
            >
              <Box
                width={90}
                height={90}
                component="img"
                src="/assets/media/archive.png"
                alt="delete display image"
              />
            </Stack>
          </Stack>
          <Box width="80%" margin="auto">
            <Typography
              my={2}
              variant="body1"
              component="h2"
              color="text.secondary"
              align="center"
            >
              {error}
            </Typography>
          </Box>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button onClick={handleClose} variant="contained" color="disabled">
              BEKOR QILISH
            </Button>
            <LoadingButton
              onClick={status === "archived" ? moveToPrevious : moveToArchive}
              variant="contained"
              loading={isLoading}
            >
              TASDIQLASH
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmArchivemodal;
