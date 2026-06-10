import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fetchCart,
  addToCartAPI,
  removeFromCartAPI,
} from "./cartAPI";

// GET CART
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      return await fetchCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      return await addToCartAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

// REMOVE FROM CART
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkAPI) => {
    try {
      return await removeFromCartAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },

  extraReducers: (builder) => {

    // GET CART
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.cart.products;
    });

    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ADD TO CART
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.cart.products;
    });

    // REMOVE FROM CART
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload.cart.products;
    });

  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;