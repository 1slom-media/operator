import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { StyledEditeBtn } from "../TableRows/ProductsRow";
import EditIcon from "components/icons/EditIcon";
import { Field, getFormValues, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { updateAdminCategory } from "redux-store/admin/category/update.slice";
import useAlert from "hooks/useAlert";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
  borderColor: theme.palette.background.card,
  padding: "7px 25px",
}));

const StyledFileButton = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.lightBlue,
  border: `2px dashed ${theme.palette.blue[100]}`,
  marginBottom: "10px",
  display: "flex",
  cursor: "pointer",
}));

function CategoryUpdateModal({ handleSubmit }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.categoryUpdate.isLoading);
  const data = useSelector((state) =>
    getFormValues("update_category_form")(state)
  );
  const token = useSelector((state) => state.auth.token);
  const alert = useAlert();
  const server = useSelector((state) => state.settings.site_server);
  const callback = () => {
    dispatch(getAllCategoryAction({ token, params: {}, server }));
  };

  const handleUpdate = (values) => {
    const data = new FormData();
    data.append("label", values.label);
    data.append("avatar", values.avatar);
    dispatch(
      updateAdminCategory({
        uid: values.uid,
        data,
        token,
        alert,
        callback,
        close: () => setOpen(!open),
        server,
      })
    );
  };

  const ImagePicker = ({ input }) => {
    return (
      <Box>
        <input
          accept="image/*"
          onChange={(e) => input.onChange(e.target.files[0])}
          id="upload-company-logo"
          type="file"
          hidden
        />
        <StyledFileButton component="label" htmlFor="upload-company-logo">
          <Box
            component="img"
            src={data?.avatar ? URL.createObjectURL(data.avatar) : data?.image}
            width="80px"
            height="80px"
            sx={{ borderRadius: "50%" }}
          />
        </StyledFileButton>
      </Box>
    );
  };
  return (
    <div>
      <StyledEditeBtn onClick={handleOpen}>
        <EditIcon />
      </StyledEditeBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container flexDirection="column">
            <Grid item xs={12}>
              <StyledBox>
                <Typography variant="h6" color="secondary.100">
                  Kategoriyani yangilash
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Field component={ImagePicker} name="avatar" />
                <Typography
                  align="center"
                  variant="string"
                  color="text.legacy"
                  mb={2}
                >
                  Media faylni yuklash uchun
                  <br /> yuqorini bosing
                </Typography>
              </Box>

              <Box pl={5} pr={5} mb={2}>
                <Field
                  component={TextInput}
                  label="Kategoriya nomi"
                  placeholder="Kategoriya nomi"
                  size="small"
                  name="label"
                />
              </Box>
            </Grid>
            <Grid item xs={12} pb={2}>
              <Box textAlign="center">
                <LoadingButton
                  onClick={handleSubmit(handleUpdate)}
                  variant="contained"
                  color="blue"
                  loading={isLoading}
                >
                  Saqlash
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

CategoryUpdateModal.propTypes = {
  error: PropTypes.string,
  handleUpdate: PropTypes.func,
};

CategoryUpdateModal.defaultProps = {
  error: "",
  handleUpdate: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["avatar", "label"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "update_category_form",
  validate,
  enableReinitialize: true,
})(CategoryUpdateModal);
