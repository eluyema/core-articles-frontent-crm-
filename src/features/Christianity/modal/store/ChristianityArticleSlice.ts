import {createSlice} from '@reduxjs/toolkit';
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus";
import {ChristianityArticle} from "../entities/ChristianityArticle.ts";
import {loadChristianityArticleAction} from "../actions/loadChristianityArticle.ts";
import {updateChristianityArticleAction} from "../actions/updateChristianityArticleAction.ts";
import {deleteChristianityArticleAction} from "../actions/deleteChristianityArticleAction.ts";

export interface ChristianityArticleSlice {
    article: ChristianityArticle | null;
    loadingStatus: LoadingStatus;
}

const initialState: ChristianityArticleSlice = {
    article: null,
    loadingStatus: loadingStatuses.idle,
};

export const christianityArticleSlice = createSlice({
    name: 'christianityArticle',
    initialState,
    reducers: {
        resetState(state){
            state.article = null;
            state.loadingStatus = loadingStatuses.idle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChristianityArticleAction.pending, (state) => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(loadChristianityArticleAction.fulfilled, (state, {payload}) => {
                state.loadingStatus = loadingStatuses.success;
                state.article = payload;
            })
            .addCase(loadChristianityArticleAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })
            .addCase(updateChristianityArticleAction.pending, (state)=> {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(updateChristianityArticleAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })

            .addCase(deleteChristianityArticleAction.pending, (state) => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(deleteChristianityArticleAction.fulfilled, (state) => {
                state.loadingStatus = loadingStatuses.success;
            })
            .addCase(deleteChristianityArticleAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })
    }
});

export const { resetState } = christianityArticleSlice.actions;


export default christianityArticleSlice.reducer;
