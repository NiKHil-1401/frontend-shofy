import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import authReducer from "../features/auth/authSlice.js";

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});
