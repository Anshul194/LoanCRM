import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as enquiriesApi from "../../../src/api/enquiries";

// Thunks
export const fetchEnquiries = createAsyncThunk(
  "enquiries/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await enquiriesApi.fetchEnquiriesApi(params);
      console.log("enquiries fetched:", res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createEnquiry = createAsyncThunk(
  "enquiries/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await enquiriesApi.createEnquiryApi(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiries/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await enquiriesApi.deleteEnquiryApi(id);
      // return id so reducer can remove it locally
      return { id, res };
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
};

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};

        // Handle API shape: { result: [...], currentPage, totalPages, totalDocuments }
        if (payload && Array.isArray(payload.result)) {
          state.items = payload.result;
          state.total =
            payload.totalDocuments ?? payload.total ?? payload.result.length;
          state.page = payload.currentPage ?? state.page;
          state.totalPages = payload.totalPages ?? state.totalPages;
          // limit may not be provided by this API; keep existing
        }
        // older/alternate shapes
        else if (Array.isArray(payload)) {
          state.items = payload;
          state.total = payload.length;
        } else if (payload.data && Array.isArray(payload.data)) {
          state.items = payload.data;
          state.total =
            payload.total ?? payload.meta?.total ?? state.items.length;
          state.page = payload.page ?? payload.meta?.page ?? state.page;
          state.limit = payload.limit ?? payload.meta?.limit ?? state.limit;
        } else if (payload.items && Array.isArray(payload.items)) {
          state.items = payload.items;
          state.total = payload.total ?? state.items.length;
        } else {
          // fallback: set items to payload.items or empty array
          state.items = payload.items || [];
          state.total = payload.total ?? (state.items ? state.items.length : 0);
        }
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        // backend may return created object
        const created = action.payload?.data ?? action.payload;
        if (created) {
          // prepend
          state.items = [created, ...state.items];
          state.total = (state.total || 0) + 1;
        }
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        if (id != null) {
          state.items = state.items.filter(
            (it) => (it._id ?? it.id ?? it) !== id
          );
          state.total = Math.max(0, (state.total || 1) - 1);
        }
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default enquiriesSlice.reducer;
