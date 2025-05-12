import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";
import {api} from "../../../../../app/api";

type ChristianityArticleTranslationResponse = {
    id: string;
    category: string;
    subcategory: string;
    slug: string;
    createdAt: string | null;
    updatedAt: string;
    availableLanguages: string[];
    language: string;
    title: string;
    description: string;
    previewImageUrl: string;
    previewImageAlt: string;
    previewBlurImageImageUrl: string;
    content: string;
}

export const loadChristianityArticleTranslation = async (slug: string, lang: string) : Promise<ChristianityArticleTranslationResponse> => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + `/api/christianity/translations/${slug}/${lang}`;
    return await api.get<ChristianityArticleTranslationResponse>(url).json();
};
