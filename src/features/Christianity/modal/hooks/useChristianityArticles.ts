import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {loadChristianityArticlesAction} from "../actions/loadChristianityArticles.ts";

export const useChristianityArticles = () => {
    const {articles, loadingStatus } = useAppSelector((state) => state.christianityArticles);

    const dispatch = useAppDispatch();

    const loadArticles = () => {
        dispatch(loadChristianityArticlesAction());
    }

    return {
        articles,
        loadingStatus,
        loadArticles,
    };
};
