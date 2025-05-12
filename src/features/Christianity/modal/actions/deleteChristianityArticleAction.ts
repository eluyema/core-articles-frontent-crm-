import {createAsyncThunk} from "@reduxjs/toolkit";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

import {deleteChristianityArticle} from "../../api/endpoints/articles/deleteChristianityArticle.ts";

export const deleteChristianityArticleAction = createAsyncThunk(
    'christianityArticle/delete',
    async (slug: string, {dispatch}) => {
        try {
            await deleteChristianityArticle(slug);

            dispatch(showAlert({message:`Стаття "${slug}" успішно видалена`, color: "green"}))

            document.location.pathname = "/admin/christianity/articles";
        } catch (e) {
            if( e instanceof Error) {
                dispatch(showAlert({ message: e.message || "Помилка збереження Статті. Можливо цей slug вже існує" , color: "red"}))
            }
            throw e;
        }
    })