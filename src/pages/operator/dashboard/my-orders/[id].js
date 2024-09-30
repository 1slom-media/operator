import { Stack, Grid, Typography, Button } from "@mui/material";
import Head from "next/head";
import AdminCard from "components/general/Cards/AdminCard";
import OrderEditForm from "components/admin/EDITPAGES/order";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSingleOrder } from "redux-store/admin/orders/orders.slice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OperatorLayout from "components/operator/Layout";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import OrderStatusModal from "components/operator/OrderStatusChangerModal";
import Loader from "components/loaders/loader";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.admin.singleOrder);
  const server = useSelector((state) => state.settings.site_server);

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getAdminSingleOrder({ _id: router?.query?.id, token, server }));
    }
  }, [router?.query?.id]);

  return (
    <OperatorLayout>
      <Head>
        <title>Operator</title>
      </Head>
      <Stack>
        <Grid container>
          <Grid item xs={12}>
            <Typography mb={3} variant="h6" color="text.legacy">
              Buyurtma malumotlari tahlili
            </Typography>
            <Stack
              mb={1}
              direction="row"
              gap="10px"
              justifyContent={{ xs: "space-between", md: "flex-start" }}
            >
              <OrderStatusModal
                startIcon={<DoDisturbAltIcon />}
                color="error"
                variant="contained"
                title="Atkaz"
                status="canceled"
                id={data?._id}
              />
              <OrderStatusModal
                startIcon={<HourglassEmptyIcon />}
                color="blue"
                variant="contained"
                title="Keyinga"
                status="pending"
                id={data?._id}
              />
              <OrderStatusModal
                startIcon={<ProductionQuantityLimitsIcon />}
                color="warning"
                variant="contained"
                title="Tugagan"
                status="hold"
                id={data?._id}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AdminCard>
              {data ? (
                <OrderEditForm
                  {...data}
                  initialValues={{
                    city_id: data?.city_id,
                    status: data?.status,
                    address: data?.address,
                    message: data?.message,
                    extra_info: data?.extra_info,
                    streamId: data?.streamId,
                    orderItems: data?.orderItems,
                  }}
                />
              ) : (
                <Loader />
              )}
            </AdminCard>
          </Grid>
        </Grid>
      </Stack>
    </OperatorLayout>
  );
};

export default Page;
