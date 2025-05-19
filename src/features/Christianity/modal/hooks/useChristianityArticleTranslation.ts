import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {
    resetState,
    setArticleTranslationDataAction,
    setSlugAndLang
} from "../store/ChristianityArticleTranslationSlice.ts";
import {useCallback} from "react";
import {OutputData} from "@editorjs/editorjs";
import {
    createChristianityArticleTranslationAction
} from "../actions/translations/createChristianityArticleTranslation.ts";
import {
    updateChristianityArticleTranslationAction
} from "../actions/translations/updateChristianityArticleTranslation.ts";
import {
    deleteChristianityArticleTranslationAction
} from "../actions/translations/deleteChristianityArticleTranslation.ts";
import {loadChristianityArticleTranslationAction} from "../actions/translations/loadChristianityArticleTranslation.ts";
import {translateArticleAction} from "../actions/translations/translateArticle.ts";

export const useChristianityArticleTranslation = () => {
    const {article, loadedArticle, slug, lang, loadingStatus } = useAppSelector((state) => state.christianityArticleTranslationSlice);
    const dispatch = useAppDispatch();

    const resetArticleTranslationState = useCallback(() => {
        dispatch(resetState());
    }, [dispatch]);

    const setArticleTranslationData = (params: Partial<{
        previewImage: File | null;
        language:  string;
        active: boolean;
        previewImageAlt: string;
        title: string;
        description: string;
        content: OutputData;
    }>) => {
        dispatch(setArticleTranslationDataAction(params));
    }

    const createChristianityArticleTranslation = (params: {content: OutputData}) => {
        dispatch(setArticleTranslationDataAction(params))
        dispatch(createChristianityArticleTranslationAction())
    }

    const editChristianityArticleTranslation = (params: {content: OutputData}) => {
        dispatch(setArticleTranslationDataAction(params))
        return dispatch(updateChristianityArticleTranslationAction())
    }

    const updateSlugAndLang = (params: {slug?: string; lang?: string}) => {
        dispatch(setSlugAndLang(params));
    }

    const deleteChristianityArticleTranslation = () => {
        dispatch(deleteChristianityArticleTranslationAction())
    }

    const loadChristianityArticleTranslation = (slug: string, lang: string) => {
        dispatch(loadChristianityArticleTranslationAction({slug, lang}))
    }

    const translateCurrentArticle = () => {
        dispatch(translateArticleAction())
    }

    return {
        slug,
        lang,
        article,
        loadedArticle,
        loadingStatus,
        updateSlugAndLang,
        setArticleTranslationData,
        resetArticleTranslationState,
        createChristianityArticleTranslation,
        editChristianityArticleTranslation,
        deleteChristianityArticleTranslation,
        loadChristianityArticleTranslation,
        translateCurrentArticle
    };
};
