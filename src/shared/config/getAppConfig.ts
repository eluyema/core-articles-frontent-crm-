export const getAppConfig = () => {
    return {
        serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
    }
}