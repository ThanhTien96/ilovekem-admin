import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";
import accountSlice from "./account/accountSlice";
import countDocument from "./countDocument/countDocument";

const createReducer = combineReducers({
    productSlice,
    postSlice,
    accountSlice,
    countDocument,
});

export default createReducer;