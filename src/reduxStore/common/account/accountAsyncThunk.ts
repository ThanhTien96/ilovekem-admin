import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountService, AccountTypeService } from "services/accountService";

/** user type */
export const thunkGetAllUserType = createAsyncThunk(
    'user/getAllUserType',
    async (_, thunkApi) => {
        const res = await AccountTypeService.getAllAccountType(thunkApi.signal);
        return res.data;
    }
)

/** user */
export const thunkGetAllAccount = createAsyncThunk(
    'account/getAll',
    async (_, thunkApi) => {
        const res = await AccountService.getAllAccount(thunkApi.signal);
        return res.data;
    }
)
