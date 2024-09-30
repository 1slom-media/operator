import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewOrdersList, saveOrder } from "api/requests";

const initialState = {
  data: [],
  isLoading: false,
  orderID: "",
  isSaveLoading: false,
};

export const getOrdersStream = createAsyncThunk(
  "orders/getStreamOrders",
  getNewOrdersList
);

export const saveStreamOrder = createAsyncThunk(
  "orders/saveStreamOrder",
  saveOrder
);

export const streamReducer = createSlice({
  name: "orders/ordersStream",
  initialState,
  reducers: {
    setOrderID: (state, { payload }) => {
      state.orderID = payload;
    },
  },
  extraReducers: {
    //get stream
    [getOrdersStream.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrdersStream.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getOrdersStream.rejected]: (state) => {
      state.isLoading = false;
    },
    //saveStream
    [saveStreamOrder.pending]: (state) => {
      state.isSaveLoading = true;
    },
    [saveStreamOrder.fulfilled]: (state, { payload }) => {
      state.isSaveLoading = false;
    },
    [saveStreamOrder.rejected]: (state) => {
      state.isSaveLoading = false;
    },
  },
});

export const { setOrderID } = streamReducer.actions;

export default streamReducer.reducer;
