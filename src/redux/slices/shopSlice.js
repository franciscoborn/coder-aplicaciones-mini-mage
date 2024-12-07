import { createSlice } from "@reduxjs/toolkit";
import products from '../../data/shopProducts.json';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            products: products,
            categorySelected: "",
            productsFilteredByCategory: [],
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.productsFilteredByCategory = products.filter(product => product.category.toLowerCase() === action.payload.toLowerCase())
            state.value.categorySelected = action.payload
        },
        setProductId: (state, action) => {
            state.value.productId = action.payload
        }
    }
})

export const { setCategory, setProductId } = shopSlice.actions

export default shopSlice.reducer