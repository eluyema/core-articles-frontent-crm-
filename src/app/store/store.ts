import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "../../features/Auth/model/store/AuthSlice.ts";
import AlertSlice from "../../features/Alert/model/store/AlertSlice.ts";
import ChristianityCategoriesSlice from "../../features/Christianity/modal/store/ChristianityCategorieSlice.ts";
import ChristianityArticlesSlice from "../../features/Christianity/modal/store/ChristianityArticlesSlice.ts";
import ChristianityArticleSlice from "../../features/Christianity/modal/store/ChristianityArticleSlice.ts";
import CreateChristianityArticleSlice from "../../features/Christianity/modal/store/CreateChristianityArticleSlice.ts";
import ChristianityArticleTranslationSlice from "../../features/Christianity/modal/store/ChristianityArticleTranslationSlice.ts";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        christianityCategories: ChristianityCategoriesSlice,
        christianityArticles: ChristianityArticlesSlice,
        christianityArticle: ChristianityArticleSlice,
        createChristianityArticleSlice: CreateChristianityArticleSlice,
        christianityArticleTranslationSlice: ChristianityArticleTranslationSlice,
        alert: AlertSlice
    },

    devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch