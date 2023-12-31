import { axiosClient } from "@axios"
import { mediaPath } from "constants/apiPath"


class MediaService {
    static getAllMedia = async () => {
        return await axiosClient({
            url: mediaPath.MEDIA,
            method: "GET"
        })
    };

    // upload image
    static postMedia = async (file: FormData) => {
        return await axiosClient({
            url: mediaPath.MEDIA,
            method: "POST",
            data: file
        })
    } 

    // delete image
    static deleteImage = async (fileName: string) => {
        return await axiosClient({
            url: mediaPath.MEDIA,
            method: 'DELETE',
            params: {
                fileName,
            }
        })
    }
}

export {
    MediaService
}