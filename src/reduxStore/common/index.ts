import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import postSlice from "./post/postSlice";

const createReducer = combineReducers({
    productSlice,
    postSlice
});

export default createReducer;