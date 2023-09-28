import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommonService } from "services/commonService";


export const thunkCountDocument = createAsyncThunk(
    'countDocument/systemCount',
    async () => {
        const res = await CommonService.countDocument();
        return res.data;
    }
)