import {createAsyncThunk} from "@reduxjs/toolkit";
import {loadChristianityArticles} from "../../api/endpoints/articles/loadChristianityArticles.ts";

export const loadChristianityArticlesAction = createAsyncThunk(
    'christianityArticles/load',
    async () => {
        return await loadChristianityArticles();
    }
);