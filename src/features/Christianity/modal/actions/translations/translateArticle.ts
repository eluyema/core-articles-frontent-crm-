import {translateArticle} from "../../../api/endpoints/articles/translateArticle.ts";

import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../../../app/store";

import { showAlert } from "../../../../Alert/model/store/AlertSlice.ts";

import {loadChristianityArticleTranslationAction} from "./loadChristianityArticleTranslation.ts";

export const translateArticleAction = createAsyncThunk(
    'christianityArticleTranslation/translateArticle',
    async (_, {getState, dispatch}) => {
        const { christianityArticleTranslationSlice } = getState() as RootState
        const { article, slug, lang} = christianityArticleTranslationSlice;

        if(!slug || !lang || !article) {
            throw new Error("Slug або мова не були задані в стані");
        }
        dispatch(showAlert({ message: `Переклад статті "${article.title}" розпочався, це може зайняти до хвилини часу!` , color: "blue"}))

        await translateArticle({slug, language:lang });

        dispatch(showAlert({ message: `Переклад статті "${article.title}" був перекладений на інші мови!` , color: "green"}))
        dispatch(loadChristianityArticleTranslationAction({slug, lang}));
    }
);