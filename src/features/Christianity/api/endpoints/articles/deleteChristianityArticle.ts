import {api} from "../../../../../app/api";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

export const deleteChristianityArticle = async (slug: string) => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + "/api/christianity/articles/" + slug;
    await api.delete(url).json();
};
