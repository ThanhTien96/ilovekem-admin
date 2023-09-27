import { message } from 'antd';
import { createSlice } from "@reduxjs/toolkit";
import { thunkFetchProfile } from "./userAsyncThunk";
import { ProfileType } from "@type/accountType";

export interface UserSliceType  {
    profile?: ProfileType;
    userLoading: boolean;
    message: string;
}


const initialState: UserSliceType = {
    profile: undefined,
    userLoading: false,
    message: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoading: (state, {payload}) => {
            state.userLoading = payload;
        },
        resetProfile: (state, {payload}) => {
            state.profile = undefined
        }
    },
    extraReducers: builder => {

        /** fetch profile */
        builder.addCase(thunkFetchProfile.fulfilled, (state, {payload}) => {
            state.profile = payload;
        })
    }
});

export const {
    setUserLoading,
    resetProfile
} = userSlice.actions;

export default userSlice.reducer;

