import {api} from "../../../../app/api";
import {getAppConfig} from "../../../../shared/config/getAppConfig.ts";

import {ChristianityArticleSlim} from "../../modal/entities/ChristianityArticle.ts";


export const loadChristianityArticles = async (): Promise<ChristianityArticleSlim[]> => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/articles";
    return await api.get<ChristianityArticleSlim[]>(url).json();
};
