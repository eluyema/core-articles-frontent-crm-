import {getAppConfig} from "../../../../shared/config/getAppConfig.ts";
import {api} from "../../../../app/api";
import { ChristianityArticle } from "../../modal/entities/ChristianityArticle.ts";

export const loadChristianityArticleBySlug = async (slug: string) : Promise<ChristianityArticle> => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/articles/"+slug;
    return await api.get<ChristianityArticle>(url).json();
};
