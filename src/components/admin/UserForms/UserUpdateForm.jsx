import { Grid, Stack, Typography } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import SelectInput from "components/general/Inputs/RegionSelectInput";

const UserUpdateForm = () => {
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="text.legacy" variant="body2">Shaxsiy malumotlar</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            placeholder="Ism"
            name="name"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={PhoneMaskInput}
            placeholder="Telefon raqam"
            name="phone"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            placeholder="Login"
            disabled
            value="201912134"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            placeholder="Telegram ID"
            name="telegramID"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field component={SelectInput} name="region" size="small" />
        </Grid>
      </Grid>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["phone", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "user_update_form",
  validate,
  enableReinitialize: true,
})(UserUpdateForm);
