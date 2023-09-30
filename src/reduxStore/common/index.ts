import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";
import accountSlice from "./account/accountSlice";
import userSlice from "./user/userSlice";
import countDocument from "./countDocument/countDocument";
import mediaSlice from "./media/mediaSlice";

const createReducer = combineReducers({
    productSlice,
    postSlice,
    accountSlice,
    userSlice,
    countDocument,
    mediaSlice,
});

export default createReducer;