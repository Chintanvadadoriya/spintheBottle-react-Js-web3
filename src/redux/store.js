import { configureStore } from "@reduxjs/toolkit";
import { stakingReducer } from "./slice/stackSlice";

export const store = configureStore({
    reducer: {
        stack: stakingReducer,
    }
});