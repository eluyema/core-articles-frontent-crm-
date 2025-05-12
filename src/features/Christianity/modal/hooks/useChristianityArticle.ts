import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {loadChristianityArticleAction} from "../actions/loadChristianityArticle.ts";
import {updateChristianityArticleAction} from "../actions/updateChristianityArticleAction.ts";
import {resetState} from "../store/ChristianityArticleSlice.ts";
import {useCallback} from "react";
import {deleteChristianityArticleAction} from "../actions/deleteChristianityArticleAction.ts";

export const useChristianityArticle = () => {
    const { article, loadingStatus } = useAppSelector((state) => state.christianityArticle);
    const dispatch = useAppDispatch();

    const loadArticle = (slug: string) => {
        dispatch(loadChristianityArticleAction(slug));
    }

    const resetArticleState = useCallback( () => {
        dispatch(resetState());
    }, [dispatch]);

    const updateArticle = (params: {newSlug: string ,currentSlug: string; subcategory: string; category: string, active: boolean}) => {
        dispatch(updateChristianityArticleAction(params))
    }

    const deleteArticle = (slug: string) => {
        dispatch(deleteChristianityArticleAction(slug))
    }

    return {
        article,
        loadingStatus,
        loadArticle,
        updateArticle,
        resetArticleState,
        deleteArticle
    };
};
