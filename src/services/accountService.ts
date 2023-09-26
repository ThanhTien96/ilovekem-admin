import { axiosClient } from "@axios"
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
}