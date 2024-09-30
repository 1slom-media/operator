import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderByStatus, updateOrder } from "api/requests";

const initialState = {
  data: [],
  isLoading: false,
  isUpdateLoading: false,
};

export const getOrdersByStatus = createAsyncThunk(
  "orders/getStreamOrdersByStatus",
  getOrderByStatus
);

export const updateTakenOrder = createAsyncThunk(
  "orders/updateTakenOrder",
  updateOrder
);

export const ordersByStatusReducer = createSlice({
  name: "orders/ordersByStatus",
  initialState,
  extraReducers: {
    [getOrdersByStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrdersByStatus.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getOrdersByStatus.rejected]: (state) => {
      state.isLoading = false;
    },
    //update taken order
    [updateTakenOrder.pending]: (state) => {
      state.isUpdateLoading = true;
    },
    [updateTakenOrder.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
    },
    [updateTakenOrder.rejected]: (state) => {
      state.isUpdateLoading = false;
    },
  },
});

export default ordersByStatusReducer.reducer;
