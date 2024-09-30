import { Grid, Stack } from "@mui/material";
import { reduxForm, Field, Form } from "redux-form";
import AvatarUploader from "components/admin/Uploaders/AvatarUploader";
import TextInput from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import RegionSelect from "components/general/Inputs/RegionSelectInput";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "redux-store/user/user.slice";

const ProfileComponent = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.user.isUpdateLoading);
  const updateUserProfile = (values) => {
    const data = new FormData();
    data.append("name", values?.name);
    data.append("region", values?.region);
    data.append("avatar", values?.profileImage);
    dispatch(editUser({ server, token, data }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack mb={3}>
          <Field component={AvatarUploader} name="profileImage" />
        </Stack>
      </Grid>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            label="Ism"
            placeholder="ism"
            name="name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            label="Balans"
            placeholder="Balans"
            name="balance"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={RegionSelect}
            label="Viloyatingiz"
            placeholder="Viloyatingiz"
            name="region"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            label="Telefon raqam"
            placeholder="Telefon raqam"
            name="phone"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            label="Koinlar"
            placeholder="Koinlar"
            name="bitcoin"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            label="To'langan qiymat"
            placeholder="To'langan qiymat"
            name="paid"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Stack mt={4} direction={"row"} justifyContent={"center"}>
            <LoadingButton
              onClick={handleSubmit(updateUserProfile)}
              variant="contained"
              loading={isLoading}
            >
              Saqlash
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = ["name", "region"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Ushbu ustun to'ldirilishi shart";
    }
  });

  if (values?.region == 0) {
    errors["region"] = "Viloyatni tanlang";
  }

  return errors;
}

export default reduxForm({
  form: "profile_update_form",
  validate,
  enableReinitialize: true,
})(ProfileComponent);
