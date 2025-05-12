import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {resetState, setCreateArticleDataAction } from "../store/CreateChristianityArticleSlice.ts";
import {useCallback} from "react";
import {createChristianityArticleAction} from "../actions/createChristianityArticleAction.ts";
import {OutputData} from "@editorjs/editorjs";

export const useCreateChristianityArticle = () => {
    const {article, loadingStatus } = useAppSelector((state) => state.createChristianityArticleSlice);
    const dispatch = useAppDispatch();

    const resetCreateArticleState = useCallback(() => {
        dispatch(resetState());
    }, [dispatch]);

    const setArticleData = (params: Partial<{
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
    }>) => {
        dispatch(setCreateArticleDataAction(params));
    }

    const createChristianityArticle = (params: {content: OutputData}) => {
        dispatch(createChristianityArticleAction(params))
    }

    return {
        article,
        loadingStatus,
        setArticleData,
        resetCreateArticleState,
        createChristianityArticle
    };
};
