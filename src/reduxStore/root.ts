import { combineReducers } from "@reduxjs/toolkit";

import app from "./app";
import common from './common'


type AsyncReducersProps = {
    [key: string]: any;
  }
  

export const rootReducer = {
  app,
  common,
};

const createReducer = (asyncReducers?: AsyncReducersProps) => combineReducers({
    // add extra reduvers
    ...asyncReducers,
    ...rootReducer,
});

export default createReducer;
