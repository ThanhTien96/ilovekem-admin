import {combineReducers} from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import helmet from './helmet';

const createReducer = combineReducers({
    themeSlice,
    helmet
});

export default createReducer;