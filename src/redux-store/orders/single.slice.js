import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleUserOrder } from "api/requests";

const initialState = {
  data: {},
  isLoading: false,
  products: [],
};

export const getOrderById = createAsyncThunk(
  "orders/getSingleOrder",
  getSingleUserOrder
);

export const singleOrderReducer = createSlice({
  name: "orders/singleOrder",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      const findExist = state.products.find((item) => item.id === payload.id);
      if (!findExist) {
        state.products.push(payload);
      }
    },
    increaseQuantity: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      state.products[index].quantity += 1;
    },
    decreaseQuantity: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      if (state.products[index].quantity > 1) {
        state.products[index].quantity -= 1;
      } else {
        const stateCopy = [...state.products];
        state.products = stateCopy.filter((item) => item.id !== payload);
      }
    },
  },
  extraReducers: {
    [getOrderById.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      state.products = payload.orderItems;
    },
    [getOrderById.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity } =
  singleOrderReducer.actions;

export default singleOrderReducer.reducer;
