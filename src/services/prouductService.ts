import { axiosClient } from "@axios"
import { ProductType } from "@type/product";
import { AxiosHeaders } from "axios"
import { productPath } from "constants/apiPath"


/** public product type */
export type PublicProductPayloadType = {
    id: string,
    isPublic: boolean;
}

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

    static deleteProduct = async (id: string) => {
        return await axiosClient({
            url: `${productPath.PRODUCT}/${id}`,
            method: "DELETE"
        })
    }

    /** public product */
    static updatePublicProduct = async(payload: PublicProductPayloadType) =>  {
        return await axiosClient({
            url: productPath.PUBLIC_PRODUCT,
            method: 'POST',
            params: {
                id: payload.id,
            },
            data: {
                isPublic: payload.isPublic
            }
        })
    }

    /** fetch detail product */
    static getDetailProduct = async (id: string) => {
        return await axiosClient({
            url: `${productPath.PRODUCT}/${id}`,
            method: "GET",
        })
    }

    /** udpate product */
    static updateProduct = async (id: string, data: FormData) => {
        return await axiosClient({
            url: `${productPath.PRODUCT}/${id}`,
            method: "PUT",
            data,

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