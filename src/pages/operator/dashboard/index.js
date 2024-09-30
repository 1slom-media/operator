import { Grid, Stack, Tooltip, Typography } from "@mui/material";
import OperatorLayout from "components/operator/Layout";
import { getOrdersStream } from "redux-store/orders/new.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import OrderCard from "components/operator/OrderCard";
import Loader from "components/loaders/loader";
import EmptyPage from "components/loaders/emptyPage";

const Page = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const data = useSelector((state) => state.stream.data);
  const isLoading = useSelector((state) => state.stream.isLoading);

  useEffect(() => {
    dispatch(getOrdersStream({ server, token }));
  }, []);

  const getStreamOrdersOnClick = () => {
    dispatch(getOrdersStream({ server, token }));
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
            Buyurtmalar oqimi
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
                  <OrderCard data={order} />
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
