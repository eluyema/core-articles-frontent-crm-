import {createAsyncThunk} from "@reduxjs/toolkit";
import {loadChristianityArticleTranslation} from "../../../api/endpoints/translations/loadChristianityArticleTranslation.ts";
import {urlToFile} from "../../../../../shared/lib/urlToFile.ts";
import {OutputData} from "@editorjs/editorjs";

type Params = {
    slug: string; lang: string;
}

export const loadChristianityArticleTranslationAction = createAsyncThunk(
    'christianityArticleTranslation/load',
    async ({ slug, lang }: Params) => {
        const translation = await loadChristianityArticleTranslation(slug, lang);

        const file = await urlToFile(translation.previewImageUrl);

        const content =  await JSON.parse(translation.content) as OutputData;

        return {
            ...translation,
            previewImage: file,
            content
        }
    }
);