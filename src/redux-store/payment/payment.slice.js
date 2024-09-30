import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOperatorPayments, makePaymentRequest } from "../../api/requests";

const initialState = {
  data: [],
  isLoading: false,
  isGetLoading: false,
};

export const useMakePayemntRequest = createAsyncThunk(
  "orders/useMakePayemntRequest",
  makePaymentRequest
);

export const useGetPayemntRequests = createAsyncThunk(
  "orders/useMakeGetPayemntRequest",
  getOperatorPayments
);

export const paymentsReducer = createSlice({
  name: "orders/payment",
  initialState,
  extraReducers: {
    [useMakePayemntRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [useMakePayemntRequest.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [useMakePayemntRequest.rejected]: (state) => {
      state.isLoading = false;
    },
    //get all
    [useGetPayemntRequests.pending]: (state) => {
      state.isGetLoading = true;
    },
    [useGetPayemntRequests.fulfilled]: (state, { payload }) => {
      state.isGetLoading = false;
      state.data = payload;
    },
    [useGetPayemntRequests.rejected]: (state) => {
      state.isGetLoading = false;
    },
  },
});

export default paymentsReducer.reducer;
