import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "services/postService";


/** thunk get all post */
export const thunkGetAllPost = createAsyncThunk(
    'post/getAllPost',
    async ({page = 1, keyWord = ''} : {page: number, keyWord: string}, thunkApi) => {
        const response = await PostService.getAllPost(page, keyWord,10, thunkApi.signal);
        return response.data
    }
)