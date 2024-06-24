import { configureStore } from "@reduxjs/toolkit";
import gameSetupSlice from "./gameSetupSlice";

export const store = configureStore({
    reducer: {
        gameSetup: gameSetupSlice
    }
})