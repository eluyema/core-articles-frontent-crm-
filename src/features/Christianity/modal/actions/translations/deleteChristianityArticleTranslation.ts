import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    deleteChristianityArticleTranslation
} from "../../../api/endpoints/translations/deleteChristianityArticleTranslation.ts";
import {showAlert} from "../../../../Alert/model/store/AlertSlice.ts";
import {RootState} from "../../../../../app/store";

export const deleteChristianityArticleTranslationAction = createAsyncThunk(
    'christianityArticleTranslation/delete',
    async (_, {dispatch, getState}) => {
        const { christianityArticleTranslationSlice: { lang, slug}} = getState() as RootState;
        await deleteChristianityArticleTranslation(slug, lang);
        dispatch(showAlert({ message: `Переклад статті "${slug}/${lang}" був успішно ЗНИЩЕННИЙ!` , color: "green"}))
    }
);