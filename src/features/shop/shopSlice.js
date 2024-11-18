import { createSlice } from "@reduxjs/toolkit";
//import categories from '../../data/categories.json'
//import products from '../../data/products.json'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            //categories: categories,
            //products: products,
            categorySelected: "productos", // todo: corregir
            //productsFilteredByCategory:[],
            productId: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            console.log("setCategory")
        },
        setProductId: (state, action) => {
            console.log("setProductId")
        }
    }
})

export const {setCategory, setProductId} = shopSlice.actions

export default shopSlice.reducer