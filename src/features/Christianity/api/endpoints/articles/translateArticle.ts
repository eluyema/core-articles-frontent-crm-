import {api} from "../../../../../app/api";
import {getAppConfig} from "../../../../../shared/config/getAppConfig.ts";

type TranslateArticleParams = {
    slug: string;
    language: string;
};

export const translateArticle = async (data: TranslateArticleParams) => {
    const { serverUrl } = getAppConfig();

    const url = serverUrl + `/api/christianity/translations/${data.slug}/${data.language}/translateAll`;
    await api.post(url).json();
};
