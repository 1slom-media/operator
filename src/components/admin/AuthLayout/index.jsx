import { Stack, Container, Box, Grid, styled, Typography } from "@mui/material";

const StyledContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  overflow: "hidden",
}));
const StyledContainerLeft = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background:
    "linear-gradient(96.46deg, rgba(110, 202, 254, 0.232) 2.49%, rgba(50, 144, 231, 0.132) 2.5%, rgba(0, 133, 255, 0.216) 84.09%)",
  backdropFilter: "blur(18.5px)",
  height: "100vh",
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "30px",
    paddingBottom: "0",
  },
}));
const StyledContainerRight = styled(Box)(({ theme }) => ({
  background: "#EEF6FB",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    background:
      "linear-gradient(96.46deg, rgba(110, 202, 254, 0.232) 2.49%, rgba(50, 144, 231, 0.132) 2.5%, rgba(0, 133, 255, 0.216) 84.09%)",
    backdropFilter: "blur(18.5px)",
    borderTopRightRadius: "0",
    borderBottomLeftRadius: "30px",
    height: "calc(100vh - 250px)",
  },
}));

const AuthLayout = ({ children }) => {
  return (
    <Stack>
      <Stack display={{ xs: "none", md: "flex" }}>
        <StyledContainer>
          <Grid container>
            <Grid item xs={12} md={6}>
              <StyledContainerLeft>
                <Box
                  component="img"
                  src="/assets/operator.jpg"
                  alt="Logo"
                  width={"100%"}
                  height={"100%"}
                />
                <Stack
                  sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    background: "#0007",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack>
                    <Typography
                      color={"background.paper"}
                      variant="h5"
                      align="center"
                    >
                      {process.env.NEXT_PUBLIC_SITE_NAME} operatorlar bo'limiga
                      hush kelibsiz.
                      <br />
                      Profilga kirish uchun telefon raqamingizni <br /> va{" "}
                      <b>SMS</b> kodini kiriting
                    </Typography>
                  </Stack>
                </Stack>
              </StyledContainerLeft>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledContainerRight>{children}</StyledContainerRight>
            </Grid>
          </Grid>
        </StyledContainer>
      </Stack>
      <Stack
        sx={{
          height: "100vh",
          background: "url(/assets/operator.jpg)",
          backgroundSize: "cover",
          position: "relative",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            background: "#0007",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack mb={15}>
            <Typography color={"background.paper"} variant="body1" align="center">
              {process.env.NEXT_PUBLIC_SITE_NAME} operatorlar bo'limiga hush
              kelibsiz.
              <br />
              Profilga kirish uchun telefon raqamingizni <br /> va <b>
                SMS
              </b>{" "}
              kodini kiriting
            </Typography>
          </Stack>
          <Stack>{children}</Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
