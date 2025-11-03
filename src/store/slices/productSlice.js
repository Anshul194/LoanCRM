import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

// Helpers to extract list payload robustly
const extractList = (payload) => {
  // common shapes: { data: { items: [], total, page, limit } } or { data: [] } or payload directly
  if (!payload) return { items: [], total: 0, page: 1, limit: 10 };
  if (payload.data) {
    const d = payload.data;
    // d can be an array directly or an object with common keys
    if (Array.isArray(d))
      return {
        items: d,
        total: d.length,
        page: payload.page || 1,
        limit: payload.limit || 10,
      };
    // Support API shape where list is in d.result and pagination keys like totalDocuments/currentPage
    const items = d.items || d.docs || d.products || d.data || d.result || [];
    const total =
      d.total ||
      d.totalDocs ||
      d.count ||
      d.totalDocuments ||
      (items ? items.length : 0);
    const page = d.page || d.currentPage || payload.page || 1;
    const limit = d.limit || d.perPage || payload.limit || 10;
    return { items, total, page, limit };
  }
  if (Array.isArray(payload))
    return {
      items: payload,
      total: payload.length,
      page: 1,
      limit: payload.length,
    };
  return { items: [], total: 0, page: 1, limit: 10 };
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page = 1, limit = 10, search = "" } = {}) => {
    const res = await api.get("/api/v1/products", {
      params: { page, limit, search },
    });
    return res.data;
  }
);

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const res = await api.get(`/api/v1/products/${id}`);
  return res.data.data;
});

// createProduct accepts {data, isFormData}
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ data, isFormData = false }) => {
    if (isFormData) {
      const res = await api.post(`/api/v1/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }
    const res = await api.post(`/api/v1/products`, data);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data, isFormData = false }) => {
    if (isFormData) {
      const res = await api.patch(`/api/v1/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }
    const res = await api.patch(`/api/v1/products/${id}`, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const res = await api.delete(`/api/v1/products/${id}`);
    return { id, data: res.data };
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { items, total, page, limit } = extractList(action.payload);
        state.items = items;
        state.total = total;
        state.page = page || state.page;
        state.limit = limit || state.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.data || action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        // push to front
        const created = action.payload.data || action.payload;
        if (created) state.items.unshift(created);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
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
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload.id;
        state.items = state.items.filter((i) => i._id !== id && i.id !== id);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrent } = productSlice.actions;
export default productSlice.reducer;
