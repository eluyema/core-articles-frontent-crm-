import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {useChristianityCategories} from "../../../modal/hooks/useChristianityCategories.ts";
import {loadingStatuses} from "../../../../../shared/model/LoadingStatus.ts";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const useArticleMetaForm = (handleSubmit: () => void) => {
    const { categories, loadLoadingStatus: categoriesLoadingStatus, loadChristianityCategories  } = useChristianityCategories();

    const form = useForm({
        initialValues: {
            slug: "",
            category: "",
            subcategory: "",
            language: null,
            previewImage: null,
            active: false,
        } as  {
            slug: string;
            category:string;
            subcategory:string;
            previewImage: File | null;
            language:  null | string;
            active: boolean;
        },
        validate: {
            slug: (value) => {
                if (!value) return "Slug є обов'язковим";
                if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
                    return "Slug може містити лише малі латинські літери, цифри і дефіси, але не починатися і не закінчуватись дефісом";
                return null;
            },
            category: (value) => {
                if (!value || value.length < 1) return "category є обов'язковим";
            },
            subcategory: (value) => {
                if (!value || value.length < 1) return "subcategory є обов'язковим";
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

    const category= form.values.category;

    const categoryOptions = categories.map((cat) => ({ value: cat.code, label: cat.code }));

    const found = categories.find((cat) => cat.code === category);

    const subcategoryOptions = found
        ? found.subcategories.map((sub) => ({ value: sub.code, label: sub.code }))
        : [];

    const loading = categoriesLoadingStatus === loadingStatuses.pending;

    useEffect(() => {
        if(categoriesLoadingStatus === loadingStatuses.idle) {
            loadChristianityCategories();
        }
    }, [loadChristianityCategories, categoriesLoadingStatus]);

    useEffect(() => {
        const currentCategoryObj = categories.find((cat) => cat.code === category);

        let resetSubcategory = false;

        const ableToReset = form.isDirty() &&
            !!form.values.subcategory

        if(ableToReset &&
            currentCategoryObj && !currentCategoryObj
                .subcategories.map(sc=>sc.code).includes(form.values.subcategory ?? "")) {
            resetSubcategory = true;
        }

        if(ableToReset && !category) {
            resetSubcategory = true;
        }

        if(resetSubcategory) {
            form.setFieldValue("subcategory", "");
        }
    }, [category,form]);

    const onSubmit = form.onSubmit((values) => {
        handleSubmit()
        console.log(values);
    });


    return {
        form,
        loading,
        categoryOptions,
        subcategoryOptions,
        selectedCategory: category,
        onSubmit
    };
};

export default useArticleMetaForm;