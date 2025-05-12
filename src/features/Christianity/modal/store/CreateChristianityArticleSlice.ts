import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus";
import {OutputData} from "@editorjs/editorjs";
import {createChristianityArticleAction} from "../actions/createChristianityArticleAction.ts";

export interface CreateChristianityArticleSlice {
    article: {
        slug: string;
        category:string;
        subcategory:string;
        previewImage: File | null;
        language:  string;
        active: boolean;
        previewImageAlt: string;
        title: string;
        description: string;
        content: OutputData;
    };
    loadingStatus: LoadingStatus;
}

const initialState: CreateChristianityArticleSlice = {
    article: {
        slug: "",
        category: "",
        subcategory: "",
        language: "",
        previewImage: null,
        previewImageAlt: "",
        active: false,
        title: "",
        description: "",
        content: {blocks: []},
    },
    loadingStatus: loadingStatuses.idle,
};

export const createChristianityArticleSlice = createSlice({
    name: 'createChristianityArticle',
    initialState,
    reducers: {
        setCreateArticleDataAction(state, action: PayloadAction<Partial<CreateChristianityArticleSlice["article"]>>) {
            state.article = { ...state.article, ...action.payload};
        },
        resetState(state){
            state.article = {...initialState.article};
            state.loadingStatus = loadingStatuses.idle;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChristianityArticleAction.pending, (state) => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(createChristianityArticleAction.fulfilled, (state) => {
                state.loadingStatus = loadingStatuses.success;
            })
            .addCase(createChristianityArticleAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })
    }
});

export const { setCreateArticleDataAction, resetState } = createChristianityArticleSlice.actions;

export default createChristianityArticleSlice.reducer;
