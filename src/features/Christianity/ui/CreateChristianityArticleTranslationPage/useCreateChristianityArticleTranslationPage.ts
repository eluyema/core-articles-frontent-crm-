import {useEffect} from "react";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {useNavigate, useParams} from "@tanstack/react-router";
import {OutputData} from "@editorjs/editorjs";
import {useChristianityArticleTranslation} from "../../modal/hooks/useChristianityArticleTranslation.ts";

const useCreateChristianityArticleTranslationPage = () => {
    const {article, resetArticleTranslationState, updateSlugAndLang, createChristianityArticleTranslation, loadingStatus, setArticleTranslationData } = useChristianityArticleTranslation();
    const navigate = useNavigate({ from: `/admin/christianity/articles/$slug/new-translation` })
    const { slug } = useParams({ strict: false })

    const loading = loadingStatus === loadingStatuses.pending;

    const syncContentData = (data: OutputData) => {
        setArticleTranslationData({content: data});
    }

    useEffect(() => {
        if(!slug){
            return;
        }
        updateSlugAndLang({ slug });
    }, [slug]);

    useEffect(() => {
        return () => {
            resetArticleTranslationState()
        }
    }, [resetArticleTranslationState]);

    useEffect(()=>{
        if(loadingStatus === loadingStatuses.success) {
            resetArticleTranslationState();
            navigate({ to: `/admin/christianity/articles/$slug/$lang`, params: { slug, lang: article.language } })
        }
    }, [article, loadingStatus])

    return { article, loading, slug, createChristianityArticleTranslation, syncContentData,};
}

export default useCreateChristianityArticleTranslationPage;