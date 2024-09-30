import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchOrder } from "../../api/requests";

const initialState = {
  data: [],
  isLoading: false,
};

export const useSearchOrder = createAsyncThunk(
  "orders/useSearchorder",
  searchOrder
);

export const searchOrdersReducer = createSlice({
  name: "orders/searchOrders",
  initialState,
  extraReducers: {
    [useSearchOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [useSearchOrder.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [useSearchOrder.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default searchOrdersReducer.reducer;
