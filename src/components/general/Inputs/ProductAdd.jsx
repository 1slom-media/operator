import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/material";
import { addProduct } from "redux-store/admin/orders/orders.slice";

export default function ProductAddToOrder() {
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function getProducts(e) {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: `${server}/product`,
        params: { filter: e.target.value },
        headers: { auth: token },
      });
      setLoading(false);
      setData(res.data?.products);
    } catch (error) {
      setLoading(false);
      setData([]);
    }
  }

  const dataToInsert = data?.map((item) => ({
    label: item.name,
    id: item._id,
    avatar: item?.image,
    price: item?.price,
  }));

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={dataToInsert}
      freeSolo
      loading={isLoading}
      onChange={(event, newValue) => {
        if (newValue) {
          dispatch(
            addProduct({
              quantity: 1,
              id: newValue?.id,
              image: [newValue?.avatar],
              price: newValue?.price,
            })
          );
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Box
            component="img"
            sx={{ borderRadius: "50%" }}
            loading="lazy"
            width="40px"
            height="40px"
            src={option.avatar}
            srcSet={option.avatar}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={getProducts}
          label="Mahsulot qo'shish"
          fullWidth
        />
      )}
      noOptionsText="Malumot yuq!"
      loadingText="Mahsulot qidirilmoqda..."
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
