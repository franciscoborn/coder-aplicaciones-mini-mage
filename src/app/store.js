import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/shop/shopSlice'
import cartReducer  from '../features/cart/cartSlice'
import authReducer  from '../features/auth/authSlice'
import { authApi } from '../services/authService'
import { userApi } from '../services/userService'
import { shopApi } from '../services/shopService'
import { receiptApi } from '../services/receiptsService'


export const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath] : shopApi.reducer,
        [receiptApi.reducerPath] : receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(shopApi.middleware)
            .concat(receiptApi.middleware)
});
