import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendSMSCode, confirmOTPCode } from "api/requests";

const initialState = {
  isLoading: false,
  token: null,
  isAdmin: false,
  status: 1,
  isAuth: false,
  isAuthCodeLoading: false,
  smsSent: false,
  isConfirmCodeLoading: false,
  phoneNumber: "",
  expireDate: undefined,
  sessionExpired: false,
};

export const sendPhoneAuthCode = createAsyncThunk(
  "auth/sendAuthCode",
  sendSMSCode
);

export const confirmSMSCode = createAsyncThunk(
  "auth/confirmAuthCode",
  confirmOTPCode
);

export const userAuthReducer = createSlice({
  name: "auth/makeAuthrequests",
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
    setSession(state, { payload }) {
      state.sessionExpired = payload;
    },
    setPhoneNumber(state, { payload }) {
      state.phoneNumber = payload;
    },
    removeUser: (state, {}) => {
      state.token = null;
      state.isAuth = false;
      state.phoneNumber = "";
      state.smsSent = false;
      state.isAdmin = false;
    },
  },
  extraReducers: {
    //send auth code
    [sendPhoneAuthCode.pending]: (state) => {
      state.isAuthCodeLoading = true;
      state.isAuth = false;
      state.smsSent = false;
    },
    [sendPhoneAuthCode.fulfilled]: (state, { payload }) => {
      state.isAuthCodeLoading = false;
      if (payload?.success) {
        state.isAuth = false;
        state.smsSent = true;
      }
    },
    [sendPhoneAuthCode.rejected]: (state) => {
      state.isAuthCodeLoading = false;
      state.isAuth = false;
      state.smsSent = false;
    },
    //confirm auth code
    [confirmSMSCode.pending]: (state) => {
      state.isConfirmCodeLoading = true;
      state.isAuth = false;
      state.smsSent = false;
    },
    [confirmSMSCode.fulfilled]: (state, { payload }) => {
      state.isConfirmCodeLoading = false;
      state.token = payload.token?.token;
      state.expireDate = payload.token?.expiresAt;
      state.isAdmin = payload.isAdmin;
      state.status = payload.status;
      state.isAuth = true;
      state.smsSent = false;
    },
    [confirmSMSCode.rejected]: (state) => {
      state.isConfirmCodeLoading = false;
      state.isAuth = false;
      state.smsSent = false;
    },
  },
});
export const { setPhoneNumber, removeUser, setSession } = userAuthReducer.actions;

export default userAuthReducer.reducer;
