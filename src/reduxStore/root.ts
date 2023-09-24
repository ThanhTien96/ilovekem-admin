import { combineReducers } from "@reduxjs/toolkit";

import app from "./app";
import product from './common'


type AsyncReducersProps = {
    [key: string]: any;
  }
  

export const rootReducer = {
  app,
  product,
};

const createReducer = (asyncReducers?: AsyncReducersProps) => combineReducers({
    // add extra reduvers
    ...asyncReducers,
    ...rootReducer,
});

export default createReducer;
