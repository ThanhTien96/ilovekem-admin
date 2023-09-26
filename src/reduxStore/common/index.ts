import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";
import accountSlice from "./account/accountSlice";

const createReducer = combineReducers({
    productSlice,
    postSlice,
    accountSlice,
});

export default createReducer;