import {useForm} from "@mantine/form";
import {loadingStatuses} from "../../../../../shared/model/LoadingStatus.ts";
import {useChristianityArticleTranslation} from "../../../modal/hooks/useChristianityArticleTranslation.ts";
import {useEffect} from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const useArticleTranslationMetaForm = (handleSubmit: () => void) => {
    const {
        lang,
        loadedArticle,
        article,
        loadingStatus,
        setArticleTranslationData
    } = useChristianityArticleTranslation();

    const form = useForm({
        initialValues: {
            previewImage: article.previewImage,
            previewImageAlt: article.previewImageAlt,
            title: article.title,
            description: article.description,
        } as {
            previewImage: null | File;
            previewImageAlt: string;
            title: string;
            description: string;
        },
        validate: {
            title: (value)=> {
                if (!value || value.length < 1) return "Назва є обов'язковим";
            },
            description: (value)=> {
                if (!value || value.length < 1) return "Опис є обов'язковим";
            },
            previewImageAlt: (value)=> {
                if (!value || value.length < 1) return "Підпис до зображення є обов'язковим";
            },
            previewImage: (file: File | null) => {
                if (!file) return 'Зображення є обов\'язковим';
                if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    return 'Підтримуються лише зображення у форматах JPG, PNG або WEBP';
                }
                if (file.size > MAX_FILE_SIZE) {
                    return 'Розмір зображення не повинен перевищувати 2MB';
                }
                return null;
            },
        },
    });

    useEffect(() => {
        if(article && loadingStatus === loadingStatuses.success) {
            form.setValues({
                previewImage: article.previewImage,
                previewImageAlt: article.previewImageAlt,
                title: article.title,
                description: article.description,
            })
        }
    }, [article, loadingStatus]);

    const onSubmit = form.onSubmit((values) => {
        setArticleTranslationData(values);
        handleSubmit()
    });

    const loading = loadingStatus === loadingStatuses.pending;

    return {
        loadedArticle,
        lang,
        form,
        loading,
        onSubmit
    };
};

export default useArticleTranslationMetaForm;