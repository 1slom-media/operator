import { Card, Grid, Stack } from "@mui/material";
import OperatorLayout from "components/operator/Layout";
import SearchInput from "components/general/Inputs/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { useSearchOrder } from "redux-store/orders/search.slice";
import OrderCard from "components/operator/OrderCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import EmptyPage from "components/loaders/emptyPage";
import Loader from "components/loaders/loader";

const Page = () => {
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("number");
  const data = useSelector((state) => state.search.data);
  const isLoading = useSelector((state) => state.search.isLoading);
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const handleSearch = (e) => {
    dispatch(
      useSearchOrder({ server, query: age, filter: e.target.value, token })
    );
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <OperatorLayout>
      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Qidiruv parametri
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Qidiruv parametri"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="number">Buyurtma raqami buyicha</MenuItem>
                <MenuItem value="name">Mijoz ismi buyicha</MenuItem>
                <MenuItem value="phone">Telefon raqami buyicha</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={9}>
            <SearchInput
              onChange={handleSearch}
              placeholder="Buyurtmani qidirish"
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Stack>
      <Stack mt={2}>
        {data && data?.length && !isLoading ? (
          <Grid spacing={1} container>
            {data?.map((order) => (
              <Grid xs={6} md={4} lg={2.4} item key={order?._id}>
                <OrderCard data={order} isTaken />
              </Grid>
            ))}
          </Grid>
        ) : data && !data?.length && !isLoading ? (
          <EmptyPage />
        ) : (
          <Loader />
        )}
      </Stack>
    </OperatorLayout>
  );
};

export default Page;
