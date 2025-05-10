import {useEffect} from "react";
import {useForm} from "@mantine/form";
import {ChristianityArticle} from "../../../modal/entities/ChristianityArticle.ts";
import {ChristianityCategory} from "../../../modal/entities/ChristianityCategory.ts";

type EditArticleForm = {
    article: ChristianityArticle;
    categories: ChristianityCategory[];
}


const useEditArticleForm = ({ article, categories }:EditArticleForm) => {

    const form = useForm({
        initialValues: {
            slug: article.slug,
            category: article.category,
            subcategory: article.subcategory,
            active: article.active
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
            }
        },
    });

    const category= form.values.category;

    const categoryOptions = categories.map((cat) => ({ value: cat.code, label: cat.code }));

    const found = categories.find((cat) => cat.code === category);

    const subcategoryOptions = found
        ? found.subcategories.map((sub) => ({ value: sub.code, label: sub.code }))
        : [];

    const loading = !categoryOptions.length || !article;


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

    return {
        form,
        article,
        categories,
        loading,
        categoryOptions,
        subcategoryOptions,
        selectedCategory: category
    };
};

export default useEditArticleForm;