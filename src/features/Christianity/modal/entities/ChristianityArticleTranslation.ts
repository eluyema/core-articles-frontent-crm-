import {EditorJsContent} from "../../../ArticleEditor/model/entities/EditorJsContentl.ts";

export interface ChristianityArticleTranslation {
    "id": string;
    "language": string;
    "title": string;
    "description": string;
    "previewImageUrl": string;
    "previewImageAlt":string;
    "previewBlurImageImageUrl": string;
    "content": EditorJsContent;
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