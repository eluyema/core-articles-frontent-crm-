import {createAsyncThunk} from "@reduxjs/toolkit";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

import {OutputData} from "@editorjs/editorjs";
import {RootState} from "../../../../app/store";
import {uploadArticleImage} from "../../../ArticleEditor/api/ednpoints/uploadImage.ts";
import {createChristianityArticle} from "../../api/endpoints/articles/createChristianityArticle.ts";
import {extractImageUrlsFromEditorData} from "../../../ArticleEditor/model/lib/extractImageUrlsFromEditorData.ts";

export const createChristianityArticleAction = createAsyncThunk(
    'createChristianityArticle/create',
    async (params: {content: OutputData}, {dispatch, getState}) => {
        try {
            const { createChristianityArticleSlice } = getState() as RootState
            const { article} = createChristianityArticleSlice;

            if(article.previewImage === null) {
                throw new Error("Не було обрано зображення для прев'ю");
            }

            const previewImageUrl = await uploadArticleImage(article.previewImage);

            const loadedImagesInContent = extractImageUrlsFromEditorData(params.content)

            const loadedImages = [previewImageUrl, ...loadedImagesInContent];


            await createChristianityArticle({
                "subcategory": article.subcategory,
                "slug": article.slug,
                "language": article.language,
                "title": article.title,
                "description": article.description,
                "previewImageUrl": previewImageUrl,
                "previewImageAlt": article.previewImageAlt,
                "previewBlurImageImageUrl": "",
                "content": JSON.stringify(params.content),
                "addedImageUrls": loadedImages
            });

            dispatch(showAlert({ message: `Стаття "${article.title}" була успішно створена!` , color: "green"}))
        } catch (e) {
            if( e instanceof Error) {
                dispatch(showAlert({ message: e.message || "Помилка збереження Статті. Можливо цей slug вже існує" , color: "red"}))
            }
            throw e;
        }
    })