import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = "default" | "dark";

export interface ThemeSliceType {
    selected: ThemeType;
    colorPrimary: string;
}

const initialState: ThemeSliceType = {
    selected: "default",
    colorPrimary: "#ff5722",
};


const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setSelectedTheme: (state, {payload}) => {
            state.selected = payload;
        }
    }
});

/** export reducers action */
export const {setSelectedTheme} = themeSlice.actions;

export default themeSlice.reducer;

