import {api} from "../../../../../app/api";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type UpdateChristianityArticleTranslationParams = {
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt": string;
    "previewBlurImageImageUrl": string;
    "content": string;
    addedImageUrls: string[];
};

export const updateChristianityArticleTranslation = async (slug: string, lang: string, data: UpdateChristianityArticleTranslationParams) => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + `/api/christianity/translations/${slug}/${lang}`;

    return await api.put(url, {
        json: data
    }).json();
};
