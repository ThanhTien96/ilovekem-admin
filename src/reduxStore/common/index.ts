import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";
import accountSlice from "./account/accountSlice";
import userSlice from "./user/userSlice";
import countDocument from "./countDocument/countDocument";

const createReducer = combineReducers({
    productSlice,
    postSlice,
    accountSlice,
    userSlice,
    countDocument,
});

export default createReducer;