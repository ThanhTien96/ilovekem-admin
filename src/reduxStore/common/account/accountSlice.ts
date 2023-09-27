import { createSlice } from "@reduxjs/toolkit";
import { thunkGetAllAccount, thunkGetAllUserType } from "./accountAsyncThunk";
import { AccountType } from "@type/accountType";


interface AccountSliceType {
    accountList: AccountType[];
    userType: any[]
    pageAccountLoading: boolean; 
}

const initialState: AccountSliceType = {
    accountList: [],
    userType: [],
    pageAccountLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers:{
        setPageAccountLoading: (state, {payload}) => {
            state.pageAccountLoading = payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkGetAllAccount.pending, (state) => {
            state.pageAccountLoading = true;
        });
        builder.addCase(thunkGetAllAccount.fulfilled, (state, {payload}) => {
            state.accountList = payload;
            state.pageAccountLoading = false;
        });
        builder.addCase(thunkGetAllAccount.rejected, (state) => {
            state.pageAccountLoading = false;
        });
        builder.addCase(thunkGetAllUserType.fulfilled, (state, {payload}) => {
            state.userType = payload;
        })
    }
});


export const {setPageAccountLoading} = accountSlice.actions;

export default accountSlice.reducer;