import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {loadChristianityArticleAction} from "../actions/loadChristianityArticle.ts";
import {updateChristianityArticleAction} from "../actions/updateChristianityArticleAction.ts";

export const useChristianityArticle = () => {
    const {article, loadingStatus } = useAppSelector((state) => state.christianityArticle);
    const dispatch = useAppDispatch();

    const loadArticle = (slug: string) => {
        dispatch(loadChristianityArticleAction(slug));
    }

    const updateArticle = (params: {newSlug: string ,currentSlug: string; subcategory: string; category: string, active: boolean}) => {
        dispatch(updateChristianityArticleAction(params))
    }

    return {
        article,
        loadingStatus,
        loadArticle,
        updateArticle
    };
};
