import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import modulePermissionReducer from "./slices/modulePermissionSlice";
import enquiriesReducer from "./slices/enquirySlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    role: roleReducer,
    modulePermission: modulePermissionReducer,
    enquiries: enquiriesReducer,
  },
});
