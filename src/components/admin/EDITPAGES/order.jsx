import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField"; //sm
import {
  Grid,
  Stack,
  Typography,
  styled,
  Box,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import RegionSelect from "components/general/Inputs/RegionSelectInput";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OrderStatusSelect from "components/general/Inputs/OrderStatusSelect";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "redux-store/admin/orders/orders.slice";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { getStatusText } from "utils/helpers";
import SelectExtraProduct from "../OrderAndProduct/AddProduct";
import CustomerOrderedProducts from "../OrderAndProduct/CustomerOrderedProducts";

const StyledDateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#EFF5F9",
  borderRadius: "5px",
  padding: "7px 15px",
}));

const OrderEditForm = ({
  createdAt,
  number,
  streamId,
  handleSubmit,
  phone,
  _id,
  name,
  status,
}) => {
  const isLoading = useSelector((state) => state.admin.isUpdateLoading);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const products = useSelector((state) => state.admin.orderProducts);
  const total = products?.reduce((acc, curr) => {
    let price = curr?.price ? curr?.price : curr?.productId?.price;
    let qty = curr?.quantity ? curr?.quantity : curr?.productId?.price;

    return acc + price * qty;
  }, 0);
  const callBack = (status) => {};
  const handleEditOrders = (values) => {
    const filtered = { ...values };
    filtered["orderItems"] = filtered["orderItems"]?.map((item) => ({
      variantId: item?.variantId,
      quantity: item?.quantity,
    }));
    dispatch(
      updateOrder({
        params: { data: filtered, id: _id, callBack },
        token,
        server,
      })
    );
  };
  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} spacing={2}>
        <Grid container spacing={2} item xs={12} md={6}>
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={{ xs: "flex-start", md: "space-between" }}
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Typography
                variant="body1"
                color="text.legacy"
                mb={{ xs: 2, md: 0 }}
                display={{ xs: "none", md: "block" }}
              >
                Buyurtma malumotlari
              </Typography>
              <StyledDateContainer
                sx={{ width: { xs: "100%", md: "inherit" } }}
              >
                <Stack
                  direction="row"
                  className="right_divider"
                  gap={1}
                  alignItems="center"
                >
                  <Typography variant="string">ID:</Typography>
                  <Typography variant="string" color="text.legacy">
                    {number}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1} alignItems="center" ml={2}>
                  <Typography variant="string">Vaqti:</Typography>
                  <Typography variant="string" color="text.legacy">
                    {format(new Date(createdAt), "dd-MMMM, HH:mm", {
                      locale: uz,
                    })}
                  </Typography>
                </Stack>
              </StyledDateContainer>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              InputProps={{
                startAdornment: <CalendarMonthIcon />,
              }}
              value={getStatusText(status)}
              name="number"
              disabled
              label="Buyurtma holati"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              InputProps={{
                startAdornment: <CalendarMonthIcon />,
              }}
              value={name}
              name="number"
              disabled
              label="Buyurtmachi ismi"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              InputProps={{
                startAdornment: <PhoneIcon />,
              }}
              disabled
              label="Buyurtmachi telefon raqami"
              value={phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Field component={OrderStatusSelect} name="status" />
          </Grid>
          <Grid item xs={12}>
            <Field component={RegionSelect} name="city_id" />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.legacy">
              Buyurtmachi va admin
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Field
              component={TextInput}
              name="address"
              placeholder="To'liq manzil"
              label="To'liq manzil"
              rows={4}
              multiline
            />
          </Grid>
          {streamId ? (
            <Grid item xs={12}>
              <Field
                component={TextInput}
                name="message"
                placeholder="Admin uchun izohlar"
                label="Admin uchun izohlar"
                rows={4}
                multiline
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Field
              component={TextInput}
              name="extra_info"
              placeholder="Qo'shimcha malumotlar"
              label="Qo'shimcha malumotlar"
              multiline
              rows={8}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          my={3}
        >
          <Typography>Buyurtma qilingan tovarlar</Typography>
          <Field component={SelectExtraProduct} name="orderItems" />
        </Stack>
        <Stack>
          <Divider />
        </Stack>
        <Field component={CustomerOrderedProducts} name="orderItems" />
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent={{ xs: "space-between", md: "flex-end" }}
          alignItems="center"
          gap={5}
        >
          <Button
            startIcon={<LocalPhoneIcon />}
            variant="contained"
            color="success"
            component="a"
            href={`tel:${phone}`}
          >
            Qo'ng'iroq qilish
          </Button>
          <LoadingButton
            startIcon={<SaveIcon />}
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleEditOrders)}
          >
            Saqlash
          </LoadingButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = ["name", "price", "image", "address"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  if (!values.image || values.image.length === 0) {
    errors["image"] = "Malumot kiritilmadi!";
  }

  if (values["streamId"] && !values["message"]) {
    errors["message"] = "Admin uchun izoh kiriting";
  }

  if (values?.status === "new" || values?.status === "delivered") {
    errors["status"] = "Ushbu holatga o'zgartirolmaysiz";
  }

  return errors;
}

export default reduxForm({
  form: "order_update_form",
  validate,
  enableReinitialize: true,
})(OrderEditForm);
