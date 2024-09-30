import {
  Container,
  Box,
  Typography,
  styled,
  Divider,
  Button,
} from "@mui/material";
import { confirmSMSCode, sendPhoneAuthCode } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAlert from "hooks/useAlert";
import AuthLayout from "components/admin/AuthLayout";
import AuthCode from "react-auth-code-input";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledBoxAuth } from ".";

const StyledBoxInput = styled(Box)(({ theme }) => ({
  textAlign: "center",
  input: {
    width: "50px",
    height: "50px",
    outline: "none",
    border: "1px solid",
    padding: 0,
    fontSize: "24px",
    textAlign: "center",
    borderColor: theme.palette.text.secondary,
    borderRadius: "5px",
    marginRight: "15px",
    backgroundClip: "padding-box",
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
      fontSize: "20px",
    },
  },
}));

const Page = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(60);

  const { token, phoneNumber } = useSelector((state) => state.auth);
  const server = useSelector((state) => state.settings.site_server);

  const handleOnChange = (res) => {
    if (res.length === 4) {
      let code = parseInt(res, 10);
      dispatch(
        confirmSMSCode({
          data: { code, phone: phoneNumber },
          alert,
          server,
        })
      );
    } else {
    }
  };

  const handlerResend = () => {
    const data = {};
    data["phone"] = phoneNumber;
    dispatch(sendPhoneAuthCode({ data, alert, server, router }));
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      router.push("/operator/dashboard");
    }
  }, [token]);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, phoneNumber]);
  return (
    <AuthLayout>
      <Container>
        <Link href="/">
          <Box
            display="flex"
            position="absolute"
            top={{ xs: "-148px", md: "80px" }}
            right={{ xs: "30px", md: "auto" }}
          >
            <ArrowBackIosIcon />
            <Typography variant="body1" color="text.legacy">
              Ortga
            </Typography>
          </Box>
        </Link>
        <StyledBoxAuth
          width={{ xs: "100%", md: "45%" }}
          margin="0 auto"
          position="relative"
          top={{ xs: "-40px", md: "auto" }}
        >
          <Typography
            variant="h4"
            color="text.legacy"
            mb={4}
            textAlign="center"
          >
            Kirish
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            align="center"
            mb={4}
          >
            {phoneNumber} raqamiga yuborilgan kodni kiritng
          </Typography>
          <StyledBoxInput position="relative" mb={4}>
            <AuthCode
              allowedCharacters="numeric"
              length={4}
              onChange={handleOnChange}
            />
          </StyledBoxInput>
          <Box width="60%" margin="0 auto" mb={3}>
            <Divider />
          </Box>
          <Box textAlign="center">
            {counter === 0 ? (
              <Typography variant="body2" color="black.main">
                00 : 00
              </Typography>
            ) : (
              <Typography variant="body2" color="black.main">
                00 :{<> {counter < 10 ? <>0{counter}</> : <>{counter}</>}</>}
              </Typography>
            )}

            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Tasdiqlash kodi kelmadimi?
            </Typography>
            <Button
              disabled={counter === 0 ? false : true}
              variant="outlined"
              color={counter === 0 ? "primary" : "secondary"}
              onClick={handlerResend}
            >
              Qayta yuborish
            </Button>
          </Box>
        </StyledBoxAuth>
      </Container>
    </AuthLayout>
  );
};

export default Page;
