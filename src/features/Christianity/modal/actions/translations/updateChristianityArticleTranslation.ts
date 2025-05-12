import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../../../app/store";
import {uploadArticleImage} from "../../../../ArticleEditor/api/ednpoints/uploadImage.ts";
import {extractImageUrlsFromEditorData} from "../../../../ArticleEditor/model/lib/extractImageUrlsFromEditorData.ts";

import { showAlert } from "../../../../Alert/model/store/AlertSlice.ts";
import {
    updateChristianityArticleTranslation
} from "../../../api/endpoints/translations/updateChristianityArticleTranslation.ts";
import {loadChristianityArticleTranslationAction} from "./loadChristianityArticleTranslation.ts";

export const updateChristianityArticleTranslationAction = createAsyncThunk(
    'christianityArticleTranslation/update',
    async (_, {getState, dispatch}) => {
        const { christianityArticleTranslationSlice } = getState() as RootState
        const { article, loadedArticle, slug, lang} = christianityArticleTranslationSlice;

        if(!slug || !lang) {
            throw new Error("Slug або мова не були задані в стані");
        }

        if(article.previewImage === null) {
            throw new Error("Не було обрано зображення для прев'ю");
        }

        let previewImageUrl =  article.previewImageUrl;

        const newPreviewWereAdded = article.previewImage !== loadedArticle.previewImage;

        if(newPreviewWereAdded) {
            previewImageUrl = await uploadArticleImage(article.previewImage);
        }

        const loadedImagesInContent = extractImageUrlsFromEditorData(article.content)

        const translationImages = [previewImageUrl, ...loadedImagesInContent];

        await updateChristianityArticleTranslation(slug, lang,{
            "title": article.title,
            "description": article.description,
            "previewImageUrl": previewImageUrl,
            "previewImageAlt": article.previewImageAlt,
            "previewBlurImageImageUrl": "",
            "content": JSON.stringify( article.content),
            "addedImageUrls": translationImages
        });

        dispatch(showAlert({ message: `Переклад статті "${article.title}" був успішно редагований!` , color: "green"}))
        dispatch(loadChristianityArticleTranslationAction({slug, lang}));
    }
);