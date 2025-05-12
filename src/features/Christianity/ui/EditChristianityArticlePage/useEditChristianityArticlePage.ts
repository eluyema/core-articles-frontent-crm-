import { useParams} from "@tanstack/react-router";
import {useChristianityCategories} from "../../modal/hooks/useChristianityCategories.ts";
import {useEffect} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {useChristianityArticle} from "../../modal/hooks/useChristianityArticle.ts";
import {useDisclosure} from "@mantine/hooks";
import {useAlert} from "../../../Alert/model/hooks/useAlert.ts";

const useEditChristianityArticlePage = () => {
    const { article, resetArticleState, loadArticle, loadingStatus: articleLoadingStatus, updateArticle, deleteArticle  } = useChristianityArticle();
    const {showAlert} = useAlert();
    const { slug } = useParams({ strict: false })
    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const { categories, loadLoadingStatus: categoriesLoadingStatus, loadChristianityCategories,  } = useChristianityCategories();

    useEffect(() => {
        if(categoriesLoadingStatus === loadingStatuses.idle) {
            loadChristianityCategories();
        }
    }, [categoriesLoadingStatus, resetArticleState]);

    useEffect(() => {
        if(!slug) {
            return;
        }
        if(articleLoadingStatus === loadingStatuses.idle) {
            loadArticle(slug);
        }
    }, [articleLoadingStatus, slug]);


    useEffect(()=> {
        return () => {
            resetArticleState()
        }
    },[])


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

    const handleDeleteArticle = () => {
        if(!slug) {
            showAlert({message: "Помилка отримання Slug з URL"})
            return;
        }
        deleteArticle(slug);
        closeDeleteModal();
    }

    return {
        loading,
        article,
        categories,
        deleteModalOpened, openDeleteModal, closeDeleteModal,
        updateArticle: updateArticleForm,
        handleDeleteArticle,
    };
};

export default useEditChristianityArticlePage;