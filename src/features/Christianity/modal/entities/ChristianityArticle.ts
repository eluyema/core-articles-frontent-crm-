import {ChristianityArticleTranslation, ChristianityArticleTranslationSlim} from "./ChristianityArticleTranslation.ts";

export interface ChristianityArticle {
    id: string;
    active: boolean;
    category: string;
    subcategory: string;
    slug: string;
    author: {
        username: string;
        email: string;
        roles: string;
    },
    updatedAt: string;
    translations: ChristianityArticleTranslation[];
}

export interface ChristianityArticleSlim {
    id: string;
    category: string;
    active: boolean;
    subcategory: string;
    slug: string;
    author: {
        username: string;
        email: string;
        roles: string;
    },
    updatedAt: string;
    translations: ChristianityArticleTranslationSlim[];
}