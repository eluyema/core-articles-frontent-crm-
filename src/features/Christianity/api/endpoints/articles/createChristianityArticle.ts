import {api} from "../../../../../app/api";
import {ChristianityCategory} from "../../../modal/entities/ChristianityCategory.ts";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type CreateChristianityArticleDto = {
    "subcategory": string;
    "slug": string;
    "language": string;
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt": string;
    "previewBlurImageImageUrl":string;
    "content": string;
    addedImageUrls: string[];
}

export const createChristianityArticle= async (dto: CreateChristianityArticleDto): Promise<ChristianityCategory[]> => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/articles";
    return await api.post(url, {
        json: dto
    }).json();
};
