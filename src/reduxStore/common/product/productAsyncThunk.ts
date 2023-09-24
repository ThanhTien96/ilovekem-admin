import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductTypeFromBE } from "@type/product";
import { TypeOfProductType } from "@type/productType";
import { AxiosResponse } from "axios";
import { ProductService, ProductTypeService } from "services/prouductService";


export const thunkGetAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async ({page=1, keyWord =''}: {page: number, keyWord?: string}, thunkApi) => {
        const res: AxiosResponse<ProductTypeFromBE> = await ProductService.getAllProduct(page,'', 10, thunkApi.signal);
        return res.data
    }
);

export const thunkFetchProductType = createAsyncThunk(
    'product/fetchProductType',
    async (_, {signal}) => {
        const res: AxiosResponse<TypeOfProductType[]> = await ProductTypeService.getAllProductType(signal);
        return res.data
    }
)