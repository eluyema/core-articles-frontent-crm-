import {useEffect} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {OutputData} from "@editorjs/editorjs";
import {useChristianityArticleTranslation} from "../../modal/hooks/useChristianityArticleTranslation.ts";
import {useNavigate, useParams} from "@tanstack/react-router";

const useEditChristianityArticleTranslationPage = () => {
    const { article, resetArticleTranslationState, translateCurrentArticle, loadChristianityArticleTranslation, editChristianityArticleTranslation, loadingStatus, setArticleTranslationData } = useChristianityArticleTranslation();
    const { slug, lang } = useParams({ strict: false })
    const navigate = useNavigate({ from: `/admin/christianity/articles/$slug/$lang` });

    const loading = loadingStatus === loadingStatuses.pending;

    const syncContentData = (data: OutputData) => {
        setArticleTranslationData({content: data});
    }

    useEffect(() => {
        resetArticleTranslationState();

        return () => {
            resetArticleTranslationState()
        }
    }, [resetArticleTranslationState]);

    useEffect(()=>{
        if(!lang || !slug) {
            return;
        }
        if(loadingStatus === loadingStatuses.idle) {
            loadChristianityArticleTranslation(slug, lang);
        }
    }, [loadChristianityArticleTranslation, slug, lang])

    const editArticle = (params: {content: OutputData }) => {
        editChristianityArticleTranslation(params).then(()=> {
            navigate({ to: `/admin/christianity/articles/$slug`, params: { slug,
                    //lang: article.language
            } })
        }).catch(()=>{});
    };

    return { slug, article, loading, editArticle, syncContentData, translateCurrentArticle};
}

export default useEditChristianityArticleTranslationPage;