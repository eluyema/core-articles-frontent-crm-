import {api} from "../../../../../app/api";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type CreateChristianityArticleTranslationParams = {
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt": string;
    "previewBlurImageImageUrl": string;
    "content": string;
    addedImageUrls: string[];
};

export const createChristianityArticleTranslation = async (slug: string, lang: string, data: CreateChristianityArticleTranslationParams) => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + `/api/christianity/translations/${slug}/${lang}`;

    return await api.post(url, {
        json: data
    }).json();
};
