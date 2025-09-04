// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    users: userReducer,
    auth: authReducer,
    project: projectReducer,
  },
});

export default store;
