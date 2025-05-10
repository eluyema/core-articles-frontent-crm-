import {createSlice} from '@reduxjs/toolkit';
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus";
import {ChristianityArticleSlim} from "../entities/ChristianityArticle.ts";
import {loadChristianityArticlesAction} from "../actions/loadChristianityArticles.ts";

export interface ChristianityArticlesSlice {
    articles: ChristianityArticleSlim[];
    loadingStatus: LoadingStatus;
}

const initialState: ChristianityArticlesSlice = {
    articles: [],
    loadingStatus: loadingStatuses.idle,
};

export const christianityArticlesSlice = createSlice({
    name: 'christianityArticles',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChristianityArticlesAction.pending, (state) => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(loadChristianityArticlesAction.fulfilled, (state, {payload}) => {
                state.loadingStatus = loadingStatuses.success;
                state.articles = payload;
            })
            .addCase(loadChristianityArticlesAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })
    }
});

export default christianityArticlesSlice.reducer;
