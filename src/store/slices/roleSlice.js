import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

const extractList = (payload) => {
  if (!payload) return { items: [], total: 0, page: 1, limit: 10 };
  const d = payload.data || payload;
  if (Array.isArray(d))
    return { items: d, total: d.length, page: 1, limit: d.length };
  const items = d.result || d.docs || d.items || d.data || [];
  const total =
    d.total || d.totalDocs || d.totalDocuments || (items ? items.length : 0);
  const page = d.currentPage || d.page || 1;
  const limit = d.limit || 10;
  return { items, total, page, limit };
};

export const fetchRoles = createAsyncThunk(
  "role/fetchRoles",
  async ({ page = 1, limit = 10, filters = {} } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (filters && Object.keys(filters).length)
        params.filters = JSON.stringify(filters);
      const res = await api.get("/v1/roles" /* base path is /v1 */, { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getRole = createAsyncThunk(
  "role/getRole",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/v1/roles/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createRole = createAsyncThunk(
  "role/createRole",
  async (body, { rejectWithValue }) => {
    try {
      const res = await api.post(`/v1/roles`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/v1/roles/${id}`, body);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/v1/roles/${id}`);
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
  limit: 10,
  loading: false,
  error: null,
  current: null,
};

const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearCurrentRole(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        const { items, total, page, limit } = extractList(action.payload);
        state.items = items;
        state.total = total;
        state.page = page || state.page;
        state.limit = limit || state.limit;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.data || action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload.data || action.payload;
        if (created) state.items.unshift(created);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data || action.payload;
        if (updated && updated._id) {
          const idx = state.items.findIndex(
            (i) => i._id === updated._id || i.id === updated._id
          );
          if (idx !== -1)
            state.items[idx] = { ...state.items[idx], ...updated };
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        state.items = state.items.filter((i) => i._id !== id && i.id !== id);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { clearCurrentRole } = slice.actions;
export default slice.reducer;
