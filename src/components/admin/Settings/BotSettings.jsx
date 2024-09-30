import { Box, Grid, Stack, Button } from "@mui/material";
import React from "react";
import BotCard from "../BotCard/BotCard";
import { LoadingButton } from "@mui/lab";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { updateBotSettings } from "redux-store/admin/message/bot.slice";
import useAlert from "hooks/useAlert";

const BotSettings = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.bot.isUpdateLoading);

  const alert = useAlert();

  const handleUpdate = (values) => {
    dispatch(updateBotSettings({ server, token, alert, data: values }));
  };

  return (
    <Stack>
      <Grid container>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali yangi tushayotgan buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Yangi buyurtmalar uchun"
            name="new_order"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali tayyor  buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Tayyor buyurtmalar uchun"
            name="ready"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali yo'lda holatiga o'tkazilgan buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Yo'ldagi buyurtmalar uchun"
            name="onway"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali yetkazilgan buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Jo'natilgan buyurtmalar uchun"
            name="delivered"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali atkaz buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Atkaz buyurtmalar uchun"
            name="canceled"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali keyin olinadigan buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Keyin olinadigan buyurtmalar uchun"
            name="pending"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali hold buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Hold buyurtmalar uchun"
            name="hold"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali arxivlangan buyurtmalarni telegramdagi botingiz orqali ham qabul qilish va unga ishlov berish imkoniyatiga ega bo'lasiz"
            title="Arxivlangan buyurtmalar uchun"
            name="archived"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali mahsulotlar yangilanganligi haqidagi malumotni telegramdagi mahsus bot orqali qabul qilishingiz mumkin!"
            title="Mahsulot yangilanganda"
            name="update_product"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali mahsulot qo'shilganligi haqidagi malumotni telegramdagi mahsus bot orqali qabul qilishingiz mumkin!"
            title="Yangi mahsulot qo'shilganda"
            name="new_product"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text="Ushbu sozlamani yoqish orqali to'lovlar  haqidagi malumotni telegramdagi mahsus bot orqali qabul qilishingiz mumkin!"
            title="To'lov uchun so'rov kelganda"
            name="payment"
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={5}>
            <Button variant="contained" color="inherit">
              Bekor qilish
            </Button>
            <LoadingButton
              onClick={handleSubmit(handleUpdate)}
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Saqalash
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "bot_settings",
  validate,
  enableReinitialize: true,
})(BotSettings);
