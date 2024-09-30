import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const checkboxSlice = createSlice({
  name: "checkbox/slice",
  initialState,
  reducers: {
    handleOrderCheck: (state, { payload }) => {
      const stateCopy = { ...state };
      const findIfExist = state.orders.find((item) => item === payload);
      if (findIfExist) {
        state.orders = stateCopy.orders.filter((item) => item !== payload);
      } else {
        state.orders.push(payload);
      }
    },
  },
});

export const { handleOrderCheck } = checkboxSlice.actions;

export default checkboxSlice.reducer;
