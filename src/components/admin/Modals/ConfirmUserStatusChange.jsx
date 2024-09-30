import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import LockIcon from "components/icons/LockIcon";
import UnLockIcon from "components/icons/UnLockIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomersList,
  updateCustomer,
} from "redux-store/admin/customers/customers.slice";

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

export const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background[200],
  width: "35px",
  height: "35px",
}));

export default function ConfirmUserStatusChange({ status, id }) {
  const isUserBlockLoading = useSelector(
    (state) => state.customers.isUpdateLoading
  );
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const server = useSelector((state) => state.settings.site_server);
  const callBack = (isSuccess) => {
    if (isSuccess) handleClose();
  };
  const handleBlockUser = () => {
    dispatch(
      updateCustomer({
        token,
        params: { data: { status: status ? 0 : 1 }, id, callBack },
        server,
      })
    );
  };
  return (
    <div>
      <StyledIconBtn onClick={handleOpen}>
        {!status ? <LockIcon /> : <UnLockIcon />}
      </StyledIconBtn>
      <Modal
        open={open}
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
            {status ? (
              <Typography
                my={2}
                variant="body1"
                component="h2"
                color="text.secondary"
                align="center"
              >
                Foydalanuvchi bloklanmoqda. Tasdiqlaysizmi?
              </Typography>
            ) : (
              <Typography
                my={2}
                variant="body1"
                component="h2"
                color="text.secondary"
                align="center"
              >
                Foydalanuvchi blokdan chiqarilmoqda. Tasdiqlaysizmi?
              </Typography>
            )}
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
              onClick={handleBlockUser}
              variant="contained"
              color="error"
              loading={isUserBlockLoading}
            >
              TASDIQLASH
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

ConfirmUserStatusChange.propTypes = {
  text: PropTypes.string,
  handleUserBlock: PropTypes.func,
};

ConfirmUserStatusChange.defaultProps = {
  error: "",
  handleDelete: () => {},
};
