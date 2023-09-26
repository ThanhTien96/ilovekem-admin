import { createSlice } from "@reduxjs/toolkit";
import { thunkGetAllPost } from "./postAsyncThunk";
import { PostTypeFromBE } from "@type/postType";


interface PostSliceStateType {
    postList?: PostTypeFromBE;
    pageLoading: boolean;
}

const initialState: PostSliceStateType = {
    postList: undefined,
    pageLoading: false,
};




const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPagePostLoading: (state, {payload}) => {
            state.pageLoading = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkGetAllPost.pending, (state, {payload}) => {
            state.pageLoading = true;
        });

        builder.addCase(thunkGetAllPost.fulfilled, (state, {payload}) => {
            state.pageLoading = false;
            state.postList = payload;
        });
        builder.addCase(thunkGetAllPost.rejected, (state, {payload}) => {
            state.pageLoading = false
        });
    }
});


export const {
    setPagePostLoading
} = postSlice.actions;

export default postSlice.reducer;