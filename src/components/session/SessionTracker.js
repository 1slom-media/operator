import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSession, removeUser } from "redux-store/user/auth.slice";
import { removeUserData } from "redux-store/user/user.slice";

const style = {
  position: "absolute",
  borderRadius: "4px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 3,
};

const SessionTracker = () => {
  const dispatch = useDispatch();
  const sessionExpired = useSelector((state) => state.auth.sessionExpired);
  const expireDate = useSelector((state) => state.auth.expireDate);

  let interval;

  useEffect(() => {
    interval = setInterval(sessionHandler, 3000);
  }, []);

  function sessionHandler() {
    const today = new Date().getTime();
    const sessionDate = new Date(expireDate).getTime();
    if (today > sessionDate) {
      dispatch(setSession(true));
      dispatch(removeUser());
      dispatch(removeUserData());
      clearInterval(interval);
    }
  }

  return (
    <Stack>
      <Modal
        open={sessionExpired}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="text.legacy"
          >
            Senariy muddati tugadi.
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="caption"
            sx={{ mt: 2 }}
          >
            Xavfsizlik yuzasidan ushbu qurilma uchun belgilangan senariy muddati
            tugatildi. Iltimos, davom ettrirish uchun qaytadan profilingizga
            login qilib kiring.
          </Typography>
          <Stack mt={1}>
            <Button
              onClick={() => dispatch(setSession(false))}
              variant="contained"
            >
              Qayta kirish
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default SessionTracker;
