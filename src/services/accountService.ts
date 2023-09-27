import { axiosClient } from "@axios"
import { LoginPayloadType } from "@type/accountType"
import { accountPath } from "constants/apiPath"

export class AccountTypeService {
    static getAllAccountType = async (signal: AbortSignal) => {
        return await axiosClient({
            url: accountPath.ACCOUNT_TYPE,
            method: "GET",
            signal
        })
    }
}


export class AccountService {
    static getAllAccount = async (signal: AbortSignal) => {
        return await axiosClient({
            url: accountPath.ACCOUNT,
            method: 'GET',
            signal,
        })
    }

    /** create account */
    static createAccount = async (payload: FormData) => {
        return await axiosClient({
            url: accountPath.ACCOUNT,
            method: "POST",
            data: payload,
        })
    }

    /** handle delete account */
    static deleteAccount = async (id: string) => {
        return await axiosClient({
            url: `${accountPath.ACCOUNT}/${id}`,
            method: "DELETE"
        })
    }

    /** get detail account */
    static getDetailAccount = async (id: string) => {
        return await axiosClient({
            url: `${accountPath.ACCOUNT}/${id}`,
            method: 'GET',
        })
    }

    /** udpate account */
    static updateAccount = async (id: string, payload: FormData) => {
        return await axiosClient({
            url: `${accountPath.ACCOUNT}/${id}`,
            method: "PUT",
            data: payload,
        })
    }

    /** user login */
    static userLogin = async (dataLogin: LoginPayloadType) => {
        return await axiosClient({
            url: accountPath.LOGIN,
            method: "POST",
            data: dataLogin,
        })
    }

    /** user fetch profile */
    static userFetchProfile = async () => {
        return await axiosClient({
            url: accountPath.FETCH_PROFILE,
            method: 'GET'
        })
    }
}