import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "components/icons/DeleteIcon";

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

export const StyledIconBtnDelete = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.error.light,
  width: "35px",
  height: "35px",
}));

export default function ConfirmDeletePhone({
  error,
  loading,
  isOpen,
  phone,
  handleOpen,
  handleClose,
  onSuccess,
  id,
}) {
  return (
    <div>
      <StyledIconBtnDelete onClick={handleOpen}>
        <DeleteIcon />
      </StyledIconBtnDelete>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack alignItems="center">
            <Box
              width={100}
              height={100}
              component="img"
              src="/assets/media/delete.png"
              alt="delete display image"
            />
          </Stack>
          <Box width="80%" margin="auto">
            <Typography
              my={2}
              variant="body1"
              component="h2"
              color="text.secondary"
              align="center"
            >
              {error + " " + phone}
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
              onClick={onSuccess}
              variant="contained"
              color="error"
              loading={loading}
            >
              TASDIQLASH
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

ConfirmDeletePhone.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
  handleDeleteModal: PropTypes.func,
};

ConfirmDeletePhone.defaultProps = {
  error: "",
  handleDelete: () => {},
  handleDeleteModal: () => {},
};
