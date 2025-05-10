import {useChristianityArticles} from "../../modal/hooks/useChristianityArticles.ts";
import {useEffect, useState} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";

const useChristianityArticlesListPage = () => {
    const {articles, loadArticles, loadingStatus} = useChristianityArticles();

    const [categoryFilter, setCategory] = useState<string>("");
    const [subcategoryFilter, setSubcategoryFilter] = useState<string>("");

    const updateCategoryFilter = (id: string) => {
        setCategory(id);
    }

    const updateSubcategoryFilter = (id: string) => {
        setSubcategoryFilter(id);
    }

    const availableCategories = Array.from(new Set(articles.map(c => c.category)))

    const availableSubcategories = Array.from(new Set(articles.map(c => c.subcategory)))

    const filteredArticles = articles.filter(article => {
        if (categoryFilter !== "" && categoryFilter !== article.category) {
            return false;
        }
        if (subcategoryFilter !== "" && subcategoryFilter !== article.subcategory) {
            return false;
        }

        return true;
    });

    const loading = loadingStatus === loadingStatuses.pending;

    useEffect(() => {
        loadArticles()
    }, []);

    return {
        filteredArticles,
        loading,
        categoryFilter,
        subcategoryFilter,
        updateCategoryFilter,
        updateSubcategoryFilter,
        categories: availableCategories,
        subcategories: availableSubcategories
    };
};

export default useChristianityArticlesListPage;