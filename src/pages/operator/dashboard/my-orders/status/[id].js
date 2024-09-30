import React, { useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByStatus } from "redux-store/orders/taken.slice";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OperatorLayout from "components/operator/Layout";
import { useRouter } from "next/router";
import { statusesByLabels } from "constants/statuses";
import OrderCard from "components/operator/OrderCard";
import EmptyPage from "components/loaders/emptyPage";
import Loader from "components/loaders/loader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const statistics = useSelector((state) => state.user.statistics);
  const data = useSelector((state) => state.orders.data);
  const isLoading = useSelector((state) => state.orders.isLoading);

  const handleChange = (event, newValue) => {
    router.push(`/operator/dashboard/my-orders/status/${newValue}`);
  };

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getOrdersByStatus({ server, token, status: router?.query?.id }));
    }
  }, [router?.query?.id]);

  return (
    <OperatorLayout>
      <Stack mb={2}>
        <Typography variant="h6" color="text.legacy">
          Mening buyurtmalarim
        </Typography>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={router?.query?.id}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            {statusesByLabels.map((item) => {
              return (
                <Tab
                  key={item.id}
                  label={item.label}
                  value={item.status}
                  {...a11yProps(item.status)}
                  icon={
                    <Box
                      sx={{
                        background: "#000000",
                        padding: "5px",
                        height: "25px",
                        width: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                        color: "#ffffff",
                      }}
                    >
                      {statistics && statistics[item?.status]
                        ? statistics[item?.status]
                        : 0}
                    </Box>
                  }
                  iconPosition="end"
                />
              );
            })}
          </Tabs>
        </Box>
        {statusesByLabels.map((item) => {
          return (
            <TabPanel
              key={item.status}
              value={router?.query?.id}
              index={item.status}
            >
              {!isLoading && data && data?.length ? (
                <Stack py={2}>
                  <Grid spacing={1} container>
                    {data?.map((order) => (
                      <Grid xs={6} md={4} lg={2.4} item key={order?._id}>
                        <OrderCard data={order} isTaken />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              ) : !isLoading && data && !data?.length ? (
                <EmptyPage />
              ) : (
                <Loader />
              )}
            </TabPanel>
          );
        })}
      </Box>
    </OperatorLayout>
  );
};

export default Page;
