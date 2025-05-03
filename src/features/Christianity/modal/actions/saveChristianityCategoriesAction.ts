import {createAsyncThunk} from "@reduxjs/toolkit";
import {saveChristianityCategories} from "../../api/endpoints/saveChristianityCategories.ts";

import {loadChristianityCategoriesAction} from "./loadChristianityCategories.ts";
import {ChristianityCategory} from "../entities/ChristianityCategory.ts";
import {RootState} from "../../../../app/store";
import {showAlert} from "../../../Alert/model/store/AlertSlice.ts";

const validUrlCodeRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const validateChristianityCategories = (categories: ChristianityCategory[]) => {
    const categoryCodes = new Set<string>();

    for (const category of categories) {
        if (!category.code || !validUrlCodeRegex.test(category.code)) {
            throw new Error(`Категорія "${category.code}" має невірний формат. Використовуйте лише малі літери, цифри та дефіси.`);
        }

        if (categoryCodes.has(category.code)) {
            throw new Error(`Категорія з кодом "${category.code}" дублюється. Усі коди мають бути унікальними.`);
        }

        categoryCodes.add(category.code);

        const subCodes = new Set<string>();
        for (const sub of category.subcategories) {
            if (!sub.code || !validUrlCodeRegex.test(sub.code)) {
                throw new Error(`Підтема "${sub.code}" у категорії "${category.code}" має невірний формат.`);
            }

            if (subCodes.has(sub.code)) {
                throw new Error(`Підтема з кодом "${sub.code}" у категорії "${category.code}" дублюється.`);
            }

            subCodes.add(sub.code);
        }
    }
};

export const saveChristianityCategoriesAction = createAsyncThunk(
    'christianityCategories/save',
    async (_, {getState, dispatch}) => {
        const {christianityCategories} = getState() as RootState;
        const category = christianityCategories.categories;
        try {
            validateChristianityCategories(category);

            await saveChristianityCategories(category);
            dispatch(showAlert({message:`Категорії успішно збережені`, color: "green"}))
            dispatch(loadChristianityCategoriesAction());
        } catch (e) {
            if( e instanceof Error) {
                dispatch(showAlert({ message: e.message || "Помилка збереження категорій" , color: "red"}))
            }
            throw e;
        }
    }
);