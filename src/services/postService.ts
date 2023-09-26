import { AxiosHeaders } from "axios";
import { axiosClient } from "@axios";
import { postPath } from "constants/apiPath";


export class PostService {

    /** get all post */
    static getAllPost = async (page = 1, keyWord = '', perPage = 10, signal: AbortSignal) => {
        return await axiosClient({
            url: postPath.ADMIN_POST,
            method: "GET",
            params: {
                page,
                perPage,
                keyWord
            },
            signal
        })
    }

    /** create post */
    static createPost = async (payloadData: FormData) => {
        return await axiosClient({
            url: postPath.POST,
            method: "POST",
            data: payloadData,
        })
    }

    /** delete post */
    static deletePost = async (id: string) => {
        return await axiosClient({
            url: `${postPath.POST}/${id}`,
            method: "DELETE"
        })
    }

    /** fetch detail post */
    static getDetailPost = async(id: string) => {
        return await axiosClient({
            url: `${postPath.POST}/${id}`,
            method: "GET"
        })
    }

    /** update post */
    static updatePost = async (id: string,payload: FormData) => {
        return await axiosClient({
            url: `${postPath.POST}/${id}`,
            data: payload,
            method: "PUT",
        })
    }

    /** public post */
    static publicPost = async(id: string, isPublic: boolean) => {
        return await axiosClient({
            url: postPath.PUBLIC_POST,
            method: "POST",
            params: {
                id
            },
            data : {
                isPublic
            }
        })
    }
}

