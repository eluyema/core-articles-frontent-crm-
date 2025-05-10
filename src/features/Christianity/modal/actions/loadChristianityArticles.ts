import {createAsyncThunk} from "@reduxjs/toolkit";
import {loadChristianityArticles} from "../../api/endpoints/loadChristianityArticles.ts";

export const loadChristianityArticlesAction = createAsyncThunk(
    'christianityArticles/load',
    async () => {
        return await loadChristianityArticles();
    }
);