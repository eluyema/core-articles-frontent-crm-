export const getAppConfig = () => {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
        articleWebsiteUrl: import.meta.env.VITE_ARTICLE_WEBSITE_URL ?? "",
    }
}