import { createSlice } from "@reduxjs/toolkit";
import { StoreMediaType } from "@type/mediaType";
import { thunkGetAllMedia } from "./mediaAsyncThunk";


interface MediaSliceType {
    mediaList: StoreMediaType[],
    mediaLoading: boolean;
}

const initialState: MediaSliceType = {
    mediaList: [],
    mediaLoading: false,
}


const mediaSlice = createSlice({
    name: 'mediaSlice',
    initialState,
    reducers: {
        setMediaLoading: (state, {payload}) => {
            state.mediaLoading = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkGetAllMedia.pending, (state) => {
            state.mediaLoading = true;
        });
        builder.addCase(thunkGetAllMedia.fulfilled, (state, {payload}) => {
            state.mediaList = payload;
            state.mediaLoading = false;
        });
        builder.addCase(thunkGetAllMedia.rejected, (state) => {
            state.mediaLoading = false;
        })
    }
});


export const {
    setMediaLoading,
} = mediaSlice.actions;
 
export default mediaSlice.reducer;