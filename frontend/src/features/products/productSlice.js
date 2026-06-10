import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchSingleProduct,
} from "./productAPI";

// Fetch All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",

  async (_, thunkAPI) => {
    try {

      return await fetchProducts();

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// Fetch Single Product
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",

  async (id, thunkAPI) => {
    try {

      return await fetchSingleProduct(id);

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

const initialState = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // Get Products
    builder.addCase(
      getProducts.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      getProducts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      }
    );

    builder.addCase(
      getProducts.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // Single Product
    builder.addCase(
      getSingleProduct.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      getSingleProduct.fulfilled,
      (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.product;
      }
    );

    builder.addCase(
      getSingleProduct.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

  },
});

export default productSlice.reducer;