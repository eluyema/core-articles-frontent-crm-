import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "../../features/Auth/model/store/AuthSlice.ts";
import AlertSlice from "../../features/Alert/model/store/AlertSlice.ts";
import ChristianityCategoriesSlice from "../../features/Christianity/modal/store/ChristianityCategorieSlice.ts";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        christianityCategories: ChristianityCategoriesSlice,
        alert: AlertSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch