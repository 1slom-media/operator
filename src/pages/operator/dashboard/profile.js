import { Avatar, Button, Card, Container, Grid, Stack } from "@mui/material";
import OperatorLayout from "components/operator/Layout";
import ProfileComponent from "components/operator/Profile";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PaymentForm from "components/operator/PaymentForm";
import Box from "@mui/material/Box";
import { getUser } from "redux-store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useGetPayemntRequests } from "redux-store/payment/payment.slice";
import { removeUser } from "redux-store/user/auth.slice";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [value, setValue] = React.useState(0);
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(
      useGetPayemntRequests({
        token,
        server,
        params: { page: 1, limit: 10 },
      })
    );
  };

  React.useEffect(() => {
    dispatch(getUser({ token, server }));
  }, []);

  return (
    <OperatorLayout>
      <Container>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Profil malumotlari" {...a11yProps(0)} />
              <Tab label="Mening hisobim" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {user ? <ProfileComponent initialValues={user} /> : null}
            <Stack my={5}>
              <Button
                variant="outlined"
                onClick={() => dispatch(removeUser())}
                color="error"
              >
                Profildan chiqish
              </Button>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PaymentForm userData={user} />
          </CustomTabPanel>
        </Box>
      </Container>
    </OperatorLayout>
  );
};

export default Page;
