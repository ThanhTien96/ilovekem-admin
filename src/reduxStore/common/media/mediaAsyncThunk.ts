import { createAsyncThunk } from "@reduxjs/toolkit";
import { MediaService } from "services/mediaService";


export const thunkGetAllMedia = createAsyncThunk(
    'mediaSlice/getAllMedia',
    async () => {
        const response = await MediaService.getAllMedia();
        return response.data.resources;
    }
)