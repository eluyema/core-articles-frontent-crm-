import {loadChristianityCategories} from "../../api/endpoints/loadChristianityCategories.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const loadChristianityCategoriesAction = createAsyncThunk(
    'christianityCategories/load',
    async () => {
        return await loadChristianityCategories();
    }
);