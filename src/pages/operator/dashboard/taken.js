import { Grid, Stack, Tooltip, Typography } from "@mui/material";
import OperatorLayout from "components/operator/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderRow from "components/operator/OrderRow";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getOrdersByStatus } from "redux-store/orders/taken.slice";
import OrderCard from "components/operator/OrderCard";
import Loader from "components/loaders/loader";
import EmptyPage from "components/loaders/emptyPage";

const Page = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const data = useSelector((state) => state.orders.data);
  const isLoading = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    dispatch(getOrdersByStatus({ server, token, status: "new" }));
  }, []);

  const getStreamOrdersOnClick = () => {
    dispatch(getOrdersByStatus({ server, token, status: "new" }));
  };

  return (
    <OperatorLayout>
      <Stack>
        {" "}
        <Stack
          mb={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" color="text.legacy">
            Qabul qilgan buyurtmalarim
          </Typography>
          <Tooltip title="Buyurtmalarni yuklash">
            <Fab
              onClick={getStreamOrdersOnClick}
              color="primary"
              aria-label="add"
            >
              <RefreshIcon />
            </Fab>
          </Tooltip>
        </Stack>
        {!isLoading && data && data?.length ? (
          <Stack>
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
      </Stack>
    </OperatorLayout>
  );
};

export default Page;
