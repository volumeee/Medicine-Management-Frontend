// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import breadcrumbReducer from "./reducers/breadcrumbReducer";
import userReducer from "./reducers/userReducer";
import homeReducer from "./reducers/homeReducer";
import medicineReducer from "./reducers/medicineReducer";
import supplierReducer from "./reducers/supplierActions";

const store = configureStore({
  reducer: {
    auth: authReducer,
    breadcrumb: breadcrumbReducer,
    user: userReducer,
    home: homeReducer,
    medicine: medicineReducer,
    supplier: supplierReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
