import { Button, Grid, Stack } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateAppSettings } from "redux-store/settings/settings.slice";
import useAlert from "hooks/useAlert";

const GeneralSettings = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.settings.isAppLoading);

  const addSettings = (values) => {

    dispatch(updateAppSettings({ token, server, alert, data: values }));
  };
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            placeholder="Arzon mahsulot  narxi"
            name="cheapProPrice"
            label="Arzon mahsulot  narxi"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            placeholder="Operator to'lovi"
            name="paymentOperator"
            label="Operator to'lovi"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="tgLink"
            placeholder="Telegram kanal linki"
            label="Telegram kanal linki"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="tgLink"
            placeholder="Telegram Guruh linki"
            label="Telegram Guruh linki"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="address"
            placeholder="Do'kon manzili"
            label="Do'kon manzili"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="instaLink"
            placeholder="Instagram profil linki"
            label="Instagram profil linki"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="fbLink"
            placeholder="Facebook sahifasi linki"
            label="Facebook sahifasi linki"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={5}>
          <Field
            component={TextInput}
            size="small"
            name="sitePhone"
            placeholder="Sayt aloqa raqami"
            label="Sayt aloqa raqami"
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" gap={2} my={2}>
        <Button variant="contained" color="disabled">
          Bekor qilish
        </Button>
        <LoadingButton
          onClick={handleSubmit(addSettings)}
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          Saqlash
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["sitePhone"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "general_settings_form",
  validate,
  enableReinitialize: true,
})(GeneralSettings);
