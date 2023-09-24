
import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchProductType, thunkGetAllProduct } from "./productAsyncThunk";
import { ProductTypeFromBE } from "@type/product";
import { TypeOfProductType } from "@type/productType";


interface ProductSliceType {
    productList?: ProductTypeFromBE;
    pageLoading: boolean;
    productType?: TypeOfProductType[];
}

const initialState: ProductSliceType = {
    productList: undefined,
    pageLoading: false
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(thunkGetAllProduct.fulfilled, (state, {payload}) => {
            state.productList = payload;
            state.pageLoading = false
        });
        builder.addCase(thunkGetAllProduct.pending, (state, {payload}) => {
            state.pageLoading = true
        });
        builder.addCase(thunkGetAllProduct.rejected, (state, {payload}) => {
            state.pageLoading = false;
        });
        builder.addCase(thunkFetchProductType.fulfilled, (state, {payload}) => {
            state.productType = payload;
        });
    }
});



export const {} = productSlice.actions;

export default productSlice.reducer;