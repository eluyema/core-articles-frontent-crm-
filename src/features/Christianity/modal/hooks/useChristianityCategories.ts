import { useAppDispatch, useAppSelector} from "../../../../app/store";

import {ChristianityCategory} from "../entities/ChristianityCategory";
import {ChristianitySubcategory} from "../entities/ChristianitySubcategory.ts";
import {setCategories} from "../store/ChristianityCategorieSlice.ts";
import {loadChristianityCategoriesAction} from "../actions/loadChristianityCategories.ts";
import {saveChristianityCategoriesAction} from "../actions/saveChristianityCategoriesAction.ts";

export const useChristianityCategories = () => {
    const {categories, loadLoadingStatus, saveLoadingStatus} = useAppSelector((state) => state.christianityCategories);
    const dispatch = useAppDispatch();

    const updateCategoryCode = (categoryId: number, code: string) => {
        const updated = categories.map(c =>
            c.tempId === categoryId ? {...c, code} : c
        );
        dispatch(setCategories(updated));
    };

    const updateSubcategoryCode = (categoryId: number, subId: number, code: string) => {
        const updated = categories.map(category => {
            if (category.tempId !== categoryId) return category;
            const updatedSubs = category.subcategories.map(sub =>
                sub.tempId === subId ? {...sub, code} : sub
            );
            return {...category, subcategories: updatedSubs};
        });
        dispatch(setCategories(updated));
    };

    const deleteCategory = (categoryId: number) => {
        dispatch(setCategories(categories.filter(c => c.tempId !== categoryId)));
    };

    const deleteSubcategory = (categoryId: number, subId: number) => {
        const updated = categories.map(c => {
            if (c.tempId !== categoryId) return c;
            return {
                ...c,
                subcategories: c.subcategories.filter(s => s.tempId !== subId)
            };
        });
        dispatch(setCategories(updated));
    };

    const addCategory = () => {
        const newId = Date.now();
        const newCategory: ChristianityCategory = {
            tempId: newId,
            code: '',
            subcategories: []
        };
        dispatch(setCategories([...categories, newCategory]));
    };

    const addSubcategory = (categoryId: number) => {
        const newSub: ChristianitySubcategory = {
            tempId: Date.now(),
            code: ''
        };
        const updated = categories.map(category =>
            category.tempId === categoryId
                ? {...category, subcategories: [...category.subcategories, newSub]}
                : category
        );
        dispatch(setCategories(updated));
    };

    const saveCategories = () => {
        dispatch(saveChristianityCategoriesAction());
    }

    const loadChristianityCategories = () => {
        dispatch(loadChristianityCategoriesAction())
    }

    return {
        categories,
        loadLoadingStatus,
        saveLoadingStatus,
        updateCategoryCode,
        updateSubcategoryCode,
        deleteCategory,
        deleteSubcategory,
        addCategory,
        addSubcategory,
        saveCategories,
        loadChristianityCategories
    };
};
