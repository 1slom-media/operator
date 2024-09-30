import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import productsPaginationReducer from "./products/pagination.slice";
import getSingleProductReducer from "./products/singleGet.slice";
import topProductsReducer from "./products/top.slice";
import mostSoldProductsReducer from "./products/most.slice";
import authReducer from "./user/auth.slice";
import userProfileReducer from "./user/user.slice";
import alertReducer from "./alert/alert.slice";
import settingsSlice from "./settings/settings.slice";
import checkboxSlice from "./checkbox/checkbox.slice";
import ordersByStatusReducer from "./orders/taken.slice";
import streamReducer from "./orders/new.slice";
import adminOperatorReducer from "./admin/orders/orders.slice";
import searchOrdersReducer from "./orders/search.slice";
import paymentSlice from "./payment/payment.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "settings"],
};

const rootReducer = combineReducers({
  form: formReducer,
  productPagination: productsPaginationReducer,
  productGet: getSingleProductReducer,
  topProducts: topProductsReducer,
  mostSoldProducts: mostSoldProductsReducer,
  auth: authReducer,
  user: userProfileReducer,
  alert: alertReducer,
  settings: settingsSlice,
  checkbox: checkboxSlice,
  orders: ordersByStatusReducer,
  stream: streamReducer,
  admin: adminOperatorReducer,
  search: searchOrdersReducer,
  payment: paymentSlice,
});

export default persistReducer(persistConfig, rootReducer);
