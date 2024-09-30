import { Container, Box, Typography, styled } from "@mui/material";
import { sendPhoneAuthCode, setPhoneNumber } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Field, reduxForm } from "redux-form";
import { LoadingButton } from "@mui/lab";
import useAlert from "hooks/useAlert";
import AuthLayout from "components/admin/AuthLayout";

export const StyledBoxAuth = styled(Box)(() => ({
  background: "#EEF6FB",
  boxShadow: "0px 4px 20px rgba(113, 113, 113, 0.1)",
  padding: " 20px 15px",
  borderRadius: "10px",
}));

const Page = ({ handleSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { smsSent, isAuthCodeLoading, token } = useSelector(
    (state) => state.auth
  );
  const server = useSelector((state) => state.settings.site_server);

  const handleAuth = (values) => {
    const data = { ...values };
    const phone = data["phone"];
    data["phone"] = `+${phone?.replace(/\D/g, "")}`;
    dispatch(setPhoneNumber(data.phone));
    dispatch(sendPhoneAuthCode({ data, alert, server, router }));
  };

  useEffect(() => {
    if (smsSent) {
      router.push("/auth/code");
    }
    if (!server) {
      router.push("/");
    }
    if (token) {
      router.push("/operator/dashboard");
    }
  }, [smsSent, token]);
  return (
    <AuthLayout>
      <Container>
        <StyledBoxAuth
          width={{ xs: "100%", md: "45%" }}
          margin="0 auto"
          position="relative"
          top={{ xs: "-90px", md: "auto" }}
        >
          <Typography
            variant="h5"
            color="text.legacy"
            mb={4}
            textAlign="center"
            sx={{ fontFamily: "Poppins" }}
          >
            Profilga kirish
          </Typography>

          <Typography variant="body1" color="text.legacy" mb={1}>
            Telefon raqamingizni kirting
          </Typography>
          <Field
            component={PhoneMaskInput}
            name="phone"
            placeholder="Telefon raqam"
            sx={{
              background: "#fff",
              marginBottom: "20px",
            }}
          />

          <LoadingButton
            loading={isAuthCodeLoading}
            onClick={handleSubmit(handleAuth)}
            variant="contained"
            fullWidth
          >
            Profilga kirish
          </LoadingButton>
        </StyledBoxAuth>
      </Container>
    </AuthLayout>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["phone"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "phone_auth_form",
  validate,
  enableReinitialize: true,
})(Page);
