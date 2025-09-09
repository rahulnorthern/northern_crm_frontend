import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/userThunks";

const initialState = {
  user: null,
  isLoggedIn: false,
  role: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = null;
    },
    login: (state, action) => {
      state.user = action?.payload?.display_name;
      state.isLoggedIn = true;
      state.role = action?.payload?.role;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action?.payload?.user?.display_name;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, login, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
