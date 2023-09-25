
import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchDetailProduct, thunkFetchProductType, thunkGetAllProduct } from "./productAsyncThunk";
import { ProductType, ProductTypeFromBE } from "@type/product";
import { TypeOfProductType } from "@type/productType";


interface ProductSliceType {
    productList?: ProductTypeFromBE;
    pageLoading: boolean;
    productType?: TypeOfProductType[];
    productDetail?: ProductType;
}

const initialState: ProductSliceType = {
    productList: undefined,
    pageLoading: false,
    productDetail: undefined,
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setproductLoading: (state, {payload}) => {
            state.pageLoading = payload;
        }
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
        builder.addCase(thunkFetchDetailProduct.fulfilled, (state, {payload}) => {
            state.productDetail = payload;
        });
    }
});



export const {
    setproductLoading
} = productSlice.actions;

export default productSlice.reducer;