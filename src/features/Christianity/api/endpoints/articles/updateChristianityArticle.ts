import {api} from "../../../../../app/api";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type UpdateChristianityArticleParams = {
    currentSlug: string;
    newSlug: string;
    category: string;
    subcategory: string;
    active: boolean;
};

type UpdateChristianityArticleDto = {
    slug: string;
    category: string;
    subcategory: string;
    active: boolean;
};

export const updateChristianityArticle = async (data: UpdateChristianityArticleParams) => {

    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/articles/" + data.currentSlug;
    return await api.put(url, {
        json: {
            slug: data.newSlug,
            category: data.category,
            subcategory: data.subcategory,
            active: data.active
        } as UpdateChristianityArticleDto
    }).json();
};
