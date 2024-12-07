import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice'
import authReducer  from './slices/authSlice'
import { userApi } from './apis/userApi'
import { authApi } from '../services/authService'


export const store = configureStore({
    reducer: {
        shopReducer,
        authReducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(authApi.middleware)
});
