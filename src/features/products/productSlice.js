import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ================================
   GET ALL PRODUCTS
================================ */
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ keyword = "", page = 1, category = "" }, { rejectWithValue }) => {
    try {
      // ✅ Clean query builder
      const params = new URLSearchParams();

      params.append("page", page);

      if (keyword && keyword.trim() !== "") {
        params.append("keyword", keyword);
      }

      if (category && category.trim() !== "") {
        params.append("category", category);
      }

      const url = `/api/v1/products?${params.toString()}`;

      console.log("API CALL:", url); // 🔥 debug

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

/* ================================
   GET PRODUCT DETAILS
================================ */
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

/* ================================
   PRODUCT SLICE
================================ */
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,

    productCount: 0,
    resultsPerPage: 10,
    totalPages: 0,

    loading: false,
    error: null,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    clearProductDetails: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- GET PRODUCTS ---------- */
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ SAFE DATA HANDLING
        state.products = action.payload?.products || [];

        state.productCount =
          action.payload?.filteredProductsCount || 0;

        state.resultsPerPage =
          action.payload?.resultPerPage || 10;

        state.totalPages =
          action.payload?.totalPages || 0;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- PRODUCT DETAILS ---------- */
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload?.product || null;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeErrors, clearProductDetails } =
  productSlice.actions;

export default productSlice.reducer;