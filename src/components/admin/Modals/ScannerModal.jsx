import {
  Modal,
  Box,
  Typography,
  styled,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { QrReader } from "react-qr-reader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getOrdersFromQrCode } from "redux-store/admin/orders/orders.slice";
import { StyledIconDeleteBtn } from "../Dashboard/styledComponents";

const StyledModalScanerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const ScannerModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const qrCode = useSelector((state) => state.orders);
  const server = useSelector((state) => state.settings.site_server);
  const handleQr = async (result, error) => {
    if (result)
      dispatch(getOrdersFromQrCode({ token, query: result.text, server }));
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModalScanerBox>
        <Stack p={2} direction="row" justifyContent="space-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Skaner qilish
          </Typography>
          <StyledIconDeleteBtn onClick={handleClose}>
            <CloseIcon />
          </StyledIconDeleteBtn>
        </Stack>
        <Divider />
        <Stack p={2}>
          <QrReader
            onResult={handleQr}
            style={{ width: "100%", height: "50%" }}
            videoContainerStyle={{ paddingTop: "50%" }}
          />
          <Box compnent="div" sx={{ padding: "8px 0" }}>
            {/* {(qrCode.qrResults?.length && (
              <QrTable tableData={qrCode.qrResults} />
            )) ||
              ""} */}
          </Box>
        </Stack>
      </StyledModalScanerBox>
    </Modal>
  );
};

export default ScannerModal;
