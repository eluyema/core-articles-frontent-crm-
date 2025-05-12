import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LoadingStatus, loadingStatuses} from "../../../../shared/model/LoadingStatus";
import {OutputData} from "@editorjs/editorjs";
import {loadChristianityArticleTranslationAction} from "../actions/translations/loadChristianityArticleTranslation.ts";
import {CreateChristianityArticleSlice} from "./CreateChristianityArticleSlice.ts";
import {
    createChristianityArticleTranslationAction
} from "../actions/translations/createChristianityArticleTranslation.ts";
import {
    deleteChristianityArticleTranslationAction
} from "../actions/translations/deleteChristianityArticleTranslation.ts";
import {
    updateChristianityArticleTranslationAction
} from "../actions/translations/updateChristianityArticleTranslation.ts";

export interface ChristianityArticleTranslationSlice {
    lang: string;
    slug: string;
    loadedArticle: {
        previewImageUrl: string;
        previewImage: File | null;
        previewImageAlt: string;
        title: string;
        language: string;
        description: string;
        availableLanguages: string[],
        content: OutputData;
    };
    article: {
        previewImageUrl: string;
        previewImage: File | null;
        previewImageAlt: string;
        language: string;
        title: string;
        description: string;
        content: OutputData;
    };
    loadingStatus: LoadingStatus;
}

const initialState: ChristianityArticleTranslationSlice = {
    lang: "",
    slug: "",
    loadedArticle: {
        previewImage: null,
        previewImageUrl: "",
        previewImageAlt: "",
        title: "",
        description: "",
        language: "",
        availableLanguages: [],
        content: {blocks: []},
    },
    article: {
        previewImage: null,
        previewImageUrl: "",
        previewImageAlt: "",
        title: "",
        language: "",
        description: "",
        content: {blocks: []},
    },
    loadingStatus: loadingStatuses.idle,
};

export const christianityArticleTranslationSlice = createSlice({
    name: 'christianityArticleTranslation',
    initialState,
    reducers: {
        resetState(state){
            state.article = initialState.article;
            state.loadedArticle = initialState.loadedArticle;
            state.loadingStatus = loadingStatuses.idle;
            state.lang = initialState.lang;
            state.slug = initialState.slug;
        },
        setArticleTranslationDataAction(state, action: PayloadAction<Partial<CreateChristianityArticleSlice["article"]>>) {
            state.article = { ...state.article, ...action.payload};
        },
        setSlugAndLang(state, action: PayloadAction<{slug?: string; lang?: string}>) {
            if(action.payload.lang){
                state.lang = action.payload.lang;
            }
            if(action.payload.slug) {
                state.slug = action.payload.slug;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadChristianityArticleTranslationAction.pending, (state) => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(loadChristianityArticleTranslationAction.fulfilled, (state, {payload}) => {
                state.loadingStatus = loadingStatuses.success;
                state.lang = payload.language;
                state.slug = payload.slug;
                state.article = {
                    previewImage: payload.previewImage,
                    previewImageUrl: payload.previewImageUrl,
                    previewImageAlt: payload.previewImageAlt,
                    title: payload.title,
                    language: payload.language,
                    description: payload.description,
                    content: payload.content,
                };
                state.loadedArticle = {
                    previewImage: payload.previewImage,
                    previewImageUrl: payload.previewImageUrl,
                    previewImageAlt: payload.previewImageAlt,
                    availableLanguages: payload.availableLanguages,
                    title: payload.title,
                    language: payload.language,
                    description: payload.description,
                    content: payload.content,
                };
            })
            .addCase(loadChristianityArticleTranslationAction.rejected, (state) => {
                state.loadingStatus = loadingStatuses.failed;
            })
            .addCase(createChristianityArticleTranslationAction.pending, state => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(createChristianityArticleTranslationAction.fulfilled, state => {
                state.loadingStatus = loadingStatuses.success;
            })
            .addCase(createChristianityArticleTranslationAction.rejected, state => {
                state.loadingStatus = loadingStatuses.failed;
            })


            .addCase(updateChristianityArticleTranslationAction.pending, state => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(updateChristianityArticleTranslationAction.fulfilled, state => {
                state.loadingStatus = loadingStatuses.success;
            })
            .addCase(updateChristianityArticleTranslationAction.rejected, state => {
                state.loadingStatus = loadingStatuses.failed;
            })

            .addCase(deleteChristianityArticleTranslationAction.pending, state => {
                state.loadingStatus = loadingStatuses.pending;
            })
            .addCase(deleteChristianityArticleTranslationAction.fulfilled, state => {
                state.loadingStatus = loadingStatuses.success;
            })
            .addCase(deleteChristianityArticleTranslationAction.rejected, state => {
                state.loadingStatus = loadingStatuses.failed;
            })
    }
});

export const { resetState, setSlugAndLang, setArticleTranslationDataAction } = christianityArticleTranslationSlice.actions;


export default christianityArticleTranslationSlice.reducer;
