import { Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import TextInput from "components/general/Inputs/TextField";
import SwitchInput from "components/general/Inputs/Switch";
import AdminCard from "components/general/Cards/AdminCard";
import ReactQuill from "components/general/Inputs/ReactQuill";
import ImagePicker from "components/general/Inputs/ImagePicker";
import ImgCard from "components/general/Cards/ImgCard";
import { reduxForm, Field, getFormValues } from "redux-form";
import { useSelector } from "react-redux";
import { updateAdminProduct } from "redux-store/admin/products/update.slice";
import useAlert from "hooks/useAlert";
import { LoadingButton } from "@mui/lab";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";
import { useEffect } from "react";
import CategorySelect from "components/general/Inputs/CategorySelect";
import { useDispatch } from "react-redux";

const ProductEditPage = ({ handleSubmit, initialValues }) => {
  const alert = useAlert();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.productUpdate.isLoading);
  const server = useSelector((state) => state.settings.site_server);
  const dispatch = useDispatch();

  const callback = () => {};

  const updateProductAsync = (values) => {
    const data = new FormData();
    data.append("category", values.category);
    data.append("referal_price", values.referal_price);
    data.append("name", values.name);
    data.append("postLink", values.postLink);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("bought_price", values.bought_price);
    data.append("active", values.active);
    if (values.hasLanding) {
      data.append("hasLanding", values.hasLanding);
      data.append("landingId", values.landingId);
    }
    values.image.forEach((file) => {
      data.append("image", file);
    });
    dispatch(
      updateAdminProduct({
        data,
        token,
        _id: values._id,
        alert,
        callback,
        server,
      })
    );
  };
  const data = useSelector((state) =>
    getFormValues("product_update_form")(state)
  );

  useEffect(() => {
    dispatch(getAllCategoryAction({ token, params: {}, server }));
  }, []);

  return (
    <>
      <Head>
        <title>Operator</title>
      </Head>
      <Stack>
        <Typography variant="h5" color="text.legacy" mb={2}>
          Mahsulotni yangilash
        </Typography>
        <AdminCard>
          <Stack px={3}>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.legacy" mb={2}>
                      Mahsulot haqida
                    </Typography>
                    <Field
                      component={TextInput}
                      size="small"
                      placeholder="Mahsulot nomi"
                      label="Mahsulot nomi"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={CategorySelect}
                      size="small"
                      fullWidth
                      name="category"
                      label="Mahsulot Kategoriyasi"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      bgcolor="background.lightGray"
                      borderRadius="10px"
                    >
                      <Typography color="text.legacy" variant="subtitle1">
                        Landingni faollashtirish
                      </Typography>
                      <Field
                        component={SwitchInput}
                        name="hasLanding"
                        selectableOff={initialValues?.hasLanding}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      bgcolor="background.lightGray"
                      borderRadius="10px"
                    >
                      <Typography color="text.legacy" variant="subtitle1">
                        Qo&apos;shimcha mahsulot sifatida belgilash
                      </Typography>
                      <Field component={SwitchInput} name="isPrimary" />
                    </Stack>
                  </Grid>
                  {data?.hasLanding ? (
                    <Grid item xs={12}>
                      <Field
                        component={TextInput}
                        size="small"
                        fullWidth
                        name="landingId"
                        label="Landing identifikatori"
                        placeholder="Landing identifikatori"
                        type="number"
                        disabled={initialValues?.hasLanding}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12}>
                    <Typography color="text.legacy" variant="body2" mb={2}>
                      Mahsulot rasmi
                    </Typography>
                    <Field component={ImagePicker} name="image" />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      {data?.image?.map((item, key) => (
                        <Grid height="130px" key={key} item xs={6} md={3}>
                          <Field
                            component={ImgCard}
                            name="image"
                            img={URL.createObjectURL(item)}
                            obj={item}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="text.legacy" variant="body2" mb={2}>
                      Mahsulot narxlari
                    </Typography>
                    <Field
                      component={TextInput}
                      size="small"
                      placeholder="Mahsulot narxi"
                      label="Mahsulot narxi"
                      name="price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextInput}
                      size="small"
                      placeholder="Sotib olingan narxi"
                      label="Sotib olingan narxi"
                      name="bought_price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextInput}
                      size="small"
                      placeholder="Admin to'lovi"
                      label="Admin to'lovi"
                      name="referal_price"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextInput}
                      size="small"
                      placeholder="Post havolasi"
                      label="Post havolasi"
                      name="postLink"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      bgcolor="background.lightGray"
                      borderRadius="10px"
                    >
                      <Typography color="text.legacy" variant="subtitle1">
                        Saytga joylash
                      </Typography>
                      <Field
                        component={SwitchInput}
                        name="active"
                        placeholder="Kategoriyani tanlang"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="text.legacy" variant="body2" mb={2}>
                      Mahsulot haqida ma`lumot
                    </Typography>
                    <Field
                      component={ReactQuill}
                      name="description"
                      placeholder="Mahsulot haqida"
                      theme="snow"
                      box_height={250}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" my={2}>
                  <LoadingButton
                    onClick={handleSubmit(updateProductAsync)}
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                  >
                    Saqlash
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </AdminCard>
      </Stack>
    </>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = ["name", "referal_price", "price", "bought_price"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  if (values?.hasLanding && !values["landingId"]) {
    errors["landingId"] = "Landing identifikatori kiritilmadi!";
  } else if (values?.hasLanding && values["landingId"].length < 3) {
    errors["landingId"] = "Landing identifikatori xato!";
  }

  return errors;
}

export default reduxForm({
  form: "product_update_form",
  validate,
  enableReinitialize: true,
})(ProductEditPage);
