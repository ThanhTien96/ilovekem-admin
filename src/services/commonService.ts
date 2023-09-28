import { axiosClient } from "@axios"
import { commonPath } from "constants/apiPath"


class CommonService {
    static countDocument = async () => {
        return await axiosClient({
            url: commonPath.COUNT_DOCUMENT,
            method: "GET"
        })
    }
}


export {
    CommonService
} 