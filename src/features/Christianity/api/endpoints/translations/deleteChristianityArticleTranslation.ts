import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";
import {api} from "../../../../../app/api";

export const deleteChristianityArticleTranslation = async (slug: string, lang: string)  => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + `/api/christianity/translations/${slug}/${lang}`;
    await api.delete(url).json();
};
