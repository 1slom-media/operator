import { Stack, Grid, styled, Box, Typography } from "@mui/material";

const StyledContainer = styled(Box)(({ borderColor }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  borderTop: "4px solid",
  borderColor: borderColor,
  boxShadow: "2px 8px 34px rgba(19, 107, 187, 0.06)",
  borderRadius: "15px",
  padding: 10,
  height: "100px",
}));

const PaymentStats = ({ accepted, waiting, rejected, fulfilled }) => {
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3} lg={1.9}>
          <StyledContainer borderColor="#4296FF">
            <Typography align="center" variant="h5" color="text.legacy">
              {accepted}
            </Typography>
            <Typography align="center" color="secondary.100">
              Qabul qilingan so&lsquo;rovlar
            </Typography>
          </StyledContainer>
        </Grid>
        <Grid item xs={6} sm={3} lg={1.9}>
          <StyledContainer borderColor="#E9D100">
            <Typography align="center" variant="h5" color="text.legacy">
              {waiting}
            </Typography>
            <Typography align="center" color="secondary.100">
              Kutilayotgan so&lsquo;rovlar
            </Typography>
          </StyledContainer>
        </Grid>
        <Grid item xs={6} sm={3} lg={1.9}>
          <StyledContainer borderColor="#2FAF01">
            <Typography align="center" variant="h5" color="text.legacy">
              {fulfilled}
            </Typography>
            <Typography align="center" color="secondary.100">
              Tasdiqlangan so&lsquo;rovlar
            </Typography>
          </StyledContainer>
        </Grid>
        <Grid item xs={6} sm={3} lg={1.9}>
          <StyledContainer borderColor="#E20029">
            <Typography align="center" variant="h5" color="text.legacy">
              {rejected}
            </Typography>
            <Typography align="center" color="secondary.100">
              Bekor qilingan so&lsquo;rovlar
            </Typography>
          </StyledContainer>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PaymentStats;
