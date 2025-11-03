import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

const extractList = (payload) => {
  if (!payload) return { items: [], total: 0, page: 1, limit: 10 };
  const d = payload.data || payload;
  if (Array.isArray(d)) return { items: d, total: d.length, page: 1, limit: d.length };
  const items = d.result || d.docs || d.items || d.data || [];
  const total = d.total || d.totalDocs || d.totalDocuments || (items ? items.length : 0);
  const page = d.currentPage || d.page || 1;
  const limit = d.limit || 10;
  return { items, total, page, limit };
};

export const fetchModulePermissions = createAsyncThunk(
  "modulePermission/fetchModulePermissions",
  async ({ page = 1, limit = 100, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (filters && Object.keys(filters).length) params.filters = JSON.stringify(filters);
      const res = await api.get("/api/v1/module-permissions", { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createModulePermission = createAsyncThunk(
  "modulePermission/createModulePermission",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/v1/module-permissions`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateModulePermission = createAsyncThunk(
  "modulePermission/updateModulePermission",
  async ({ id, body }, { rejectWithValue }) => {
    try {   
      const res = await api.patch(`/api/v1/module-permissions/${id}`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteModulePermission = createAsyncThunk(
  "modulePermission/deleteModulePermission",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/v1/module-permissions/${id}`);
      return { id, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 100,
  loading: false,
  error: null,
  current: null,
};

const slice = createSlice({
  name: "modulePermission",
  initialState,
  reducers: {
    clearCurrentModulePermission(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModulePermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModulePermissions.fulfilled, (state, action) => {
        state.loading = false;
        const { items, total, page, limit } = extractList(action.payload);
        state.items = items;
        state.total = total;
        state.page = page || state.page;
        state.limit = limit || state.limit;
      })
      .addCase(fetchModulePermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(createModulePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createModulePermission.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload.data || action.payload;
        if (created) state.items.unshift(created);
      })
      .addCase(createModulePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(updateModulePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateModulePermission.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data || action.payload;
        if (updated && updated._id) {
          const idx = state.items.findIndex((i) => i._id === updated._id || i.id === updated._id);
          if (idx !== -1) state.items[idx] = { ...state.items[idx], ...updated };
        }
      })
      .addCase(updateModulePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(deleteModulePermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteModulePermission.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        state.items = state.items.filter((i) => i._id !== id && i.id !== id);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteModulePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearCurrentModulePermission } = slice.actions;
export default slice.reducer;
