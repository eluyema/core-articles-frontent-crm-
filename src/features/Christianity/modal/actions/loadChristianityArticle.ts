import {createAsyncThunk} from "@reduxjs/toolkit";
import {loadChristianityArticleBySlug} from "../../api/endpoints/loadChristianityArticleBySlug.ts";

export const loadChristianityArticleAction = createAsyncThunk(
    'christianityArticle/load',
    async (slug: string) => {
        return await loadChristianityArticleBySlug(slug);
    }
);