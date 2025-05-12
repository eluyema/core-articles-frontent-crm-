import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../../../../app/store";
import {uploadArticleImage} from "../../../../ArticleEditor/api/ednpoints/uploadImage.ts";
import {extractImageUrlsFromEditorData} from "../../../../ArticleEditor/model/lib/extractImageUrlsFromEditorData.ts";

import {showAlert} from "../../../../Alert/model/store/AlertSlice.ts";
import {
    createChristianityArticleTranslation
} from "../../../api/endpoints/translations/createChristianityArticleTranslation.ts";

export const createChristianityArticleTranslationAction = createAsyncThunk(
    'christianityArticleTranslation/create',
    async (_, {getState, dispatch}) => {
        try {
            const {christianityArticleTranslationSlice} = getState() as RootState
            const {article, slug} = christianityArticleTranslationSlice;

            if (!slug) {
                throw new Error("Slug або мова не були задані в стані");
            }

            if (article.previewImage === null) {
                throw new Error("Не було обрано зображення для прев'ю");
            }

            const previewImageUrl = await uploadArticleImage(article.previewImage);

            // const newPreviewWereAdded = article.previewImage !== loadedArticle.previewImage;
            //
            // if(newPreviewWereAdded) {
            //     previewImageUrl = await uploadArticleImage(article.previewImage);
            // }

            const loadedImagesInContent = extractImageUrlsFromEditorData(article.content)

            const translationImages = [previewImageUrl, ...loadedImagesInContent];

            await createChristianityArticleTranslation(slug, article.language, {
                "title": article.title,
                "description": article.description,
                "previewImageUrl": previewImageUrl,
                "previewImageAlt": article.previewImageAlt,
                "previewBlurImageImageUrl": "",
                "content": JSON.stringify(article.content),
                "addedImageUrls": translationImages
            });

            dispatch(showAlert({message: `Переклад статті "${article.title}" був успішно створений!`, color: "green"}))
        } catch (e) {
            dispatch(showAlert({message: `Переклад статті не вдалось створити! Можливо переклад у вибраній мові вже існує! `, color: "red"}))
            throw e;
        }
    }
);