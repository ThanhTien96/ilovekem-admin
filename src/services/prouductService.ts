import { axiosClient } from "@axios"
import { AxiosHeaders } from "axios"
import { productPath } from "constants/apiPath"



class ProductService {
    static createProduct = async (data: FormData, headers?: AxiosHeaders) => {
        return await axiosClient({
            url: productPath.PRODUCT,
            method: "POST",
            data,
            headers
        })
    }
    static getAllProduct = async (page = 1, keyWord?: string, perPage = 10, signal?: AbortSignal) => {
        return await axiosClient({
            url: productPath.ADMIN_PRODUCT,
            method: 'GET',
            params: {
                page,
                perPage,
                keyWord,
            },
            signal,
        }) 
    }
}

class ProductTypeService {
    static getAllProductType = async (signal?: AbortSignal) => {
        return await axiosClient({
            url: productPath.PRODUCT_TYPE,
            method: "GET",
            signal
        })
    }
}


export {
    ProductService,
    ProductTypeService,
}