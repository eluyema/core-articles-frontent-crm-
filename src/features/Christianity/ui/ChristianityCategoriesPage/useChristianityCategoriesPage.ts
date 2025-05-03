import {useChristianityCategories} from "../../modal/hooks/useChristianityCategories.ts";
import {useEffect} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";

export const useChristianityCategoriesPage = ()=> {


    const {
        categories,
        updateCategoryCode,
        updateSubcategoryCode,
        deleteCategory,
        deleteSubcategory,
        addCategory,
        addSubcategory,
        saveCategories,
        loadChristianityCategories,
        loadLoadingStatus,
        saveLoadingStatus,
    } = useChristianityCategories();

    const loadLoading = loadLoadingStatus === loadingStatuses.pending;
    const saveLoading = saveLoadingStatus === loadingStatuses.pending;

    useEffect(() => {
        if(loadLoadingStatus === loadingStatuses.idle) {
            loadChristianityCategories();
        }
    }, [loadLoadingStatus]);

    return {
        categories,
        updateCategoryCode,
        updateSubcategoryCode,
        deleteCategory,
        deleteSubcategory,
        addCategory,
        addSubcategory,
        saveCategories,
        saveLoading,
        loadLoading,
    }
};