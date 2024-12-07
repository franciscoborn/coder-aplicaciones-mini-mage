import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice'
import authReducer  from './slices/authSlice'
import { userApi } from './apis/userApi'


export const store = configureStore({
    reducer: {
        shopReducer,
        authReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
});
