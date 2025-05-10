import { useParams} from "@tanstack/react-router";
import {useChristianityCategories} from "../../modal/hooks/useChristianityCategories.ts";
import {useEffect} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {useChristianityArticle} from "../../modal/hooks/useChristianityArticle.ts";

const useEditChristianityArticlePage = () => {
    const { article, loadArticle, loadingStatus: articleLoadingStatus, updateArticle,  } = useChristianityArticle();

    const { slug } = useParams({ strict: false })

    const { categories, loadLoadingStatus: categoriesLoadingStatus, loadChristianityCategories,  } = useChristianityCategories();

    useEffect(() => {
        if(categoriesLoadingStatus === loadingStatuses.idle) {
            loadChristianityCategories();
        }
    }, [categoriesLoadingStatus]);

    useEffect(() => {
        if(!slug) {
            return;
        }
        if(!article || categoriesLoadingStatus === loadingStatuses.idle || article && article.slug !== slug) {
            loadArticle(slug);
        }
    }, [articleLoadingStatus, slug, article]);



    const loading = categoriesLoadingStatus === loadingStatuses.pending || articleLoadingStatus === loadingStatuses.pending;

    const updateArticleForm = (data: {slug: string; category: string; subcategory: string, active: boolean})=> {
        updateArticle( {
            currentSlug: data.slug,
            newSlug: data.slug,
            category: data.category,
            subcategory: data.subcategory,
            active: data.active
        });
    }

    return {
        loading,
        article,
        categories,
        updateArticle: updateArticleForm,
    };
};

export default useEditChristianityArticlePage;