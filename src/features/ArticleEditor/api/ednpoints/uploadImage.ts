import { api } from "../../../../app/api";
import { getAppConfig } from "../../../../shared/config/getAppConfig.ts";

export const uploadArticleImage = async (file: File): Promise<string> => {
    const { serverUrl } = getAppConfig();

    const formData = new FormData();
    formData.append("image", file); // must match @RequestParam("image")

    const response = await api.post(serverUrl + "/api/uploads/image", {
        body: formData
    });

    const result = await response.json() as { success: number; error: string; file: { url: string;} };

    if (result.success !== 1 || !result.file?.url) {
        throw new Error("Image upload failed: " + (result.error ?? "Unknown error"));
    }

    return result.file.url;
};