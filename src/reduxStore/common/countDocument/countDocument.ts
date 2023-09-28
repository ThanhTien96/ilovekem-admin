import { createSlice } from "@reduxjs/toolkit";
import { thunkCountDocument } from "./countDocumentAsyncThunk";
import { SystemCountType } from "@type/commonType";



interface CountDocumentSliceType {
    systemCount?: SystemCountType;
    loading: boolean;
}

const initialState: CountDocumentSliceType = {
    systemCount: undefined,
    loading: false,
};


const countDocumentSlice = createSlice({
    name: "countDocument",
    initialState,
    reducers: {
        setPageLoading: (state, {payload}) => {
            state.loading = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkCountDocument.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(thunkCountDocument.fulfilled, (state, {payload}) => {
            state.systemCount = payload;
            state.loading = false;
        });
        builder.addCase(thunkCountDocument.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const {setPageLoading} = countDocumentSlice.actions;
export default countDocumentSlice.reducer;

