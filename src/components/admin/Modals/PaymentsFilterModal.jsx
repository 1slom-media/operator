import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Grid, Stack, styled } from "@mui/material";
import CalendarInput from "components/general/Inputs/CalendarInput";
import PaymentSelectInput from "components/general/Inputs/PaymentSelect";
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentsList } from "redux-store/admin/payment/payment.slice";

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.disabled[200],
  color: theme.palette.text.secondary,
  "&:hover": {
    background: theme.palette.disabled[200],
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function PaymentFiterModal({ handleSubmit, token, page, filter }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const server = useSelector((state) => state.settings.site_server);

  const handleFilter = (values) => {
    const data = { ...values };
    if (values.from) {
      data["from"] = values.from.getTime();
    } else data["from"] = "";
    if (values.to) {
      data["to"] = values.to.getTime();
    } else data["to"] = "";
    if (values.status === "all") {
      data["status"] = "";
    }
    dispatch(
      getPaymentsList({
        params: { ...data, page, filter, limit: 8 },
        server,
        token,
      })
    );
    setOpen(false);
  };

  return (
    <div>
      <StyledButton
        onClick={handleOpen}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        startIcon={<FilterAltOutlinedIcon />}
        color="disabled"
      >
        Filter
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            align="center"
            id="modal-modal-title"
            color="text.legacy"
            variant="body2"
            component="h2"
            mb={2}
          >
            To&apos;lovlar filteri
          </Typography>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field component={CalendarInput} name="from" label="Dan" />
              </Grid>
              <Grid item xs={12}>
                <Field component={CalendarInput} name="to" label="Gacha" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PaymentSelectInput}
                  fullWidth
                  size="small"
                  name="status"
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="disabled"
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit(handleFilter)}
                  >
                    Tasdiqlash
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["from", "to"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "payment_filter_form",
  validate,
  enableReinitialize: true,
})(PaymentFiterModal);
