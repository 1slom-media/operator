import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DropZone from "components/general/Inputs/DropZone";
import TextInput from "components/general/Inputs/TextField";
import CalendarInput from "components/general/Inputs/CalendarInput";
import { Grid } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import ImagePicker from "components/general/Inputs/ImagePicker";
import ReactQuill from "components/general/Inputs/ReactQuill";
import { useDispatch } from "react-redux";
import { postAdminGame } from "redux-store/admin/game/game.slice";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useAlert from "hooks/useAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: "20px",
  p: 3,
};

function BasicModal({ handleSubmit }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isGameLoading = useSelector((state) => state.game.isGameLoading);
  const server = useSelector((state) => state.settings.site_server);
  const alert = useAlert();

  const callBack = () => {
    handleClose();
  };

  const addGame = (values) => {
    const form = new FormData();
    form.append("name", values.name);
    form.append("content", values.content);
    form.append("startTime", values.startTime);
    form.append("endTime", values.endTime);
    form.append("banner", values.banner);
    dispatch(postAdminGame({ token, data: form, alert, callBack, server }));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Yangilash
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            color="text.legacy"
            textAlign="center"
            mb={2}
          >
            Konkursni yangilash
          </Typography>

          <Box>
            <Typography variant="body1" color="text.legacy" mb={1.5}>
              Rasm joylashtiring
            </Typography>
            <Box>
              <Field component={ImagePicker} name="banner" />
            </Box>
            <Box mb={2}>
              <Typography variant="body1" color="text.legacy" mb={1.5}>
                Konkurs nomi
              </Typography>
              <Field
                component={TextInput}
                size="small"
                label="Konkurs nomini kiriting"
                name="name"
              />
            </Box>
            <Box mb={2}>
              <Typography variant="body1" color="text.legacy" mb={1.5}>
                Konkurs haqida
              </Typography>
              <Field
                component={ReactQuill}
                name="content"
                placeholder="Konkurs haqida"
                theme="snow"
                box_height={150}
              />
            </Box>
            <Box mb={2.5}>
              <Typography variant="body1" color="text.legacy" mb={1.5}>
                Konkurs davomiyligi
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <Field
                    component={CalendarInput}
                    meta="change"
                    label="Dan..."
                    name="startTime"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field
                    component={CalendarInput}
                    meta="change"
                    label="Gacha..."
                    name="endTime"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box gap={3} display="flex" justifyContent="end">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                Bekor qilish
              </Button>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={isGameLoading}
                onClick={handleSubmit(addGame)}
              >
                Yangilash
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function validate(values, _) {
  let errors = {};
  const requiredFields = ["banner", "content", "endTime", "startTime", "name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  if (!values.image || values.image.length === 0) {
    errors["image"] = "Malumot kiritilmadi!";
  }

  return errors;
}

export default reduxForm({
  form: "game_modal",
  initialValues: {
    name: "",
    banner: "",
    content: "",
    endTime: "",
    startTime: "",
  },
  validate,
  enableReinitialize: true,
})(BasicModal);
