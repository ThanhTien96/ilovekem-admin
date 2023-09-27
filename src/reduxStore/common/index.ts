import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";
import accountSlice from "./account/accountSlice";
import userSlice from "./user/userSlice";

const createReducer = combineReducers({
    productSlice,
    postSlice,
    accountSlice,
    userSlice,
});

export default createReducer;