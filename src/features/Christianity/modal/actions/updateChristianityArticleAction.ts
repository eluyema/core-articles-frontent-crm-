import {createAsyncThunk} from "@reduxjs/toolkit";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

import {updateChristianityArticle} from "../../api/endpoints/articles/updateChristianityArticle.ts";

type Params = {newSlug: string; currentSlug: string; category: string; subcategory: string; active: boolean };

export const updateChristianityArticleAction = createAsyncThunk(
    'christianityArticle/update',
    async (params: Params, {dispatch}) => {
        try {
            await updateChristianityArticle(params);

            dispatch(showAlert({message:`Стаття успішно збережена`, color: "green"}))
            document.location.pathname = "/admin/christianity/articles/" + params.newSlug;
        } catch (e) {
            if( e instanceof Error) {
                dispatch(showAlert({ message: e.message || "Помилка збереження Статті. Можливо цей slug вже існує" , color: "red"}))
            }
            throw e;
        }
    })