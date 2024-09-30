import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import SkuSelect from "./SKUSelect";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Plus } from "components/icons/pluse";
import { MinusOutlined } from "components/icons/minus-outlined";

const ProductSelectRow = ({
  image,
  images,
  title,
  uid,
  productId,
  isEdit,
  characteristics,
  skuList,
  value,
  onChange,
  variant,
  handleClose,
}) => {
  const router = useRouter();
  const [selectedSkus, setSku] = useState([]);
  const selectedVariant = isEdit
    ? skuList?.find((item) => item?.uid === parseInt(variant?.variantId))
    : skuList?.length === 1
    ? skuList[0]
    : skuList?.find((item) => item?.uid === parseInt(router?.query?.skuid));

  const handleAddProduct = () => {
    const isExist = value?.find(
      (item) => item?.variantId === selectedVariant?.uid
    );
    if (!isExist && selectedVariant) {
      onChange([
        ...value,
        {
          variantId: selectedVariant?.uid,
          title,
          image: images[0],
          quantity: 1,
          purchasePrice: selectedVariant?.purchasePrice,
          productId: uid,
        },
      ]);
      handleClose();
    }

    if (isExist && selectedVariant) {
      const copyArray = [...value];
      const indx = copyArray?.findIndex(
        (item) => item?.variantId === selectedVariant?.uid
      );
      copyArray[indx]["quantity"] += 1;
      onChange(copyArray);
      handleClose();
    }
  };

  const handleRemoveProduct = () => {
    if (variant) {
      const filtered = value?.filter(
        (each) => each?.variantId !== variant?.variantId
      );
      onChange(filtered);
    }
  };

  const handleIncreaseAmount = () => {
    const copyArray = value.map((item) => {
      if (item?.variantId === variant?.variantId) {
        return {
          ...item,
          quantity: item?.quantity + 1,
        };
      }

      return item;
    });

    onChange(copyArray);
  };
  const handleDecreaseAmount = () => {
    const copyArray = value.map((item) => {
      if (item?.variantId === variant?.variantId) {
        return {
          ...item,
          quantity: item?.quantity - 1,
        };
      }

      return item;
    });

    onChange(copyArray);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="start"
      px={{ xs: 0, md: 2 }}
    >
      <Stack gap={2} direction={{ xs: "column", md: "row" }}>
        <Box
          width={260}
          height={320}
          component={"img"}
          sx={{ borderRadius: "4px" }}
          src={
            images
              ? images[0]["image"][240]["high"]
              : image
              ? image["image"][240]["high"]
              : null
          }
          alt="image"
        />
        <Stack>
          <Stack>
            <Typography>{title?.["uz"]}</Typography>
            <Typography color="success.main">
              #{uid ? uid : productId}
            </Typography>
          </Stack>
          <Stack>
            {isEdit ? (
              <Stack mt={2}>
                <Typography color="primary" variant="h6">
                  Tanlangan xususiyat:
                </Typography>
                <Typography variant="string">
                  {selectedVariant?.characteristicsTitle}
                </Typography>
              </Stack>
            ) : (
              characteristics?.map((item) => (
                <Stack key={item?.uid} gap="10px" mt={2}>
                  <Typography>{item?.title["uz"]}</Typography>
                  <SkuSelect
                    list={item?.values}
                    selectSKU={setSku}
                    selectedSkus={selectedSkus}
                    charLength={characteristics?.length}
                    skuList={skuList}
                  />
                </Stack>
              ))
            )}

            {!selectedVariant && !isEdit ? (
              <Stack mt={2}>
                <Alert severity="warning">
                  iltimos qushish uchun mahsulot turini tanlang
                </Alert>
              </Stack>
            ) : null}
            {isEdit ? (
              <Stack mt={2}>
                <Stack mb={2}>
                  <Typography variant="h6" color="primary">
                    Mahsulot narxi:
                  </Typography>
                  <Typography variant="string">
                    {(variant?.quantity * variant?.purchasePrice)?.toLocaleString()}{" "}
                    so&apos;m
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h6" color="primary">
                    Buyurtma soni:
                  </Typography>
                  <Stack mt={1} direction="row" alignItems="center" gap="5px">
                    <IconButton
                      onClick={handleIncreaseAmount}
                      disabled={
                        variant?.quantity === selectedVariant?.availableAmount
                      }
                      sx={{ borderRadius: "50%" }}
                    >
                      <Plus />
                    </IconButton>
                    <TextField
                      value={variant?.quantity}
                      size="small"
                      sx={{ width: 100 }}
                    />
                    <IconButton
                      onClick={handleDecreaseAmount}
                      disabled={variant?.quantity === 1}
                      sx={{ borderRadius: "50%" }}
                    >
                      <MinusOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {!isEdit ? (
        <Button
          onClick={handleAddProduct}
          disabled={!selectedVariant}
          variant="contained"
        >
          Mahsulotni qo&apos;shish
        </Button>
      ) : (
        <IconButton
          sx={{ borderRadius: "50%" }}
          color="error"
          onClick={handleRemoveProduct}
          disabled={value?.length === 1}
        >
          <Delete />
        </IconButton>
      )}
    </Stack>
  );
};

export default ProductSelectRow;
