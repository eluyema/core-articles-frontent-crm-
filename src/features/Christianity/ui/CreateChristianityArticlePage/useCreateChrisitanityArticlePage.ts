import {useEffect} from "react";
import {useCreateChristianityArticle} from "../../modal/hooks/useCreateChristianityArticle.ts";
import {loadingStatuses} from "../../../../shared/model/LoadingStatus.ts";
import {useNavigate} from "@tanstack/react-router";
import {OutputData} from "@editorjs/editorjs";

const useCreateChristianityArticlePage = () => {
    const {article, resetCreateArticleState, createChristianityArticle, loadingStatus, setArticleData } = useCreateChristianityArticle();
    const navigate = useNavigate({ from: `/admin/christianity/articles/$slug` })

    const loading = loadingStatus === loadingStatuses.pending;

    const syncContentData = (data: OutputData) => {
        setArticleData({content: data});
    }

    useEffect(() => {
        return () => {
            resetCreateArticleState()
        }
    }, [resetCreateArticleState]);

    useEffect(()=>{
        if(loadingStatus === loadingStatuses.success) {
            const slug = article.slug;
            resetCreateArticleState();
            navigate({ to: `/admin/christianity/articles/$slug`, params: { slug } })
        }
    }, [article, loadingStatus])

    return {article,loading ,createChristianityArticle, syncContentData,};
}

export default useCreateChristianityArticlePage;