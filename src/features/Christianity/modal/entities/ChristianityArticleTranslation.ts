import {OutputData} from "@editorjs/editorjs";

export interface ChristianityArticleTranslation {
    "id": string;
    "language": string;
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt":string;
    "previewBlurImageImageUrl": string;
    "content": OutputData;
}

export interface ChristianityArticleTranslationSlim {
    "id": string;
    "language": string;
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt":string;
    "previewBlurImageImageUrl": string;
    "content": null
}