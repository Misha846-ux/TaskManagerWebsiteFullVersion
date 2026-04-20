import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./reducers/SearchLineReduser";


export const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;