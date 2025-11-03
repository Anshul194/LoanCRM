import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/v1/login", { email, password });
      const data = res.data || {};

      // Try to extract tokens from common shapes
      const accessToken =
        data.accessToken ||
        data.token ||
        data.data?.accessToken ||
        data.tokens?.accessToken;
      const refreshToken =
        data.refreshToken ||
        data.data?.refreshToken ||
        data.tokens?.refreshToken;

      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      return data;
    } catch (err) {
      // prefer server error body if present
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user || action.payload.data || null;
        state.accessToken =
          action.payload.accessToken ||
          action.payload.token ||
          action.payload.data?.accessToken ||
          state.accessToken;
        state.refreshToken =
          action.payload.refreshToken ||
          action.payload.data?.refreshToken ||
          state.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
