import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";

const createReducer = combineReducers({
    productSlice,
});

export default createReducer;