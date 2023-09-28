import { createAsyncThunk } from "@reduxjs/toolkit";
import {  ProfileType } from "@type/accountType";
import { AxiosResponse } from "axios";
import { AccountService } from "services/accountService";



/** fetch profile */
export const thunkFetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => {
    const res: AxiosResponse<ProfileType> =
      await AccountService.userFetchProfile();
    return res.data;
  }
);
