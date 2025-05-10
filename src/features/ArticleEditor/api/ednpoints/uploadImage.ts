import { api } from "../../../../app/api";
import { getAppConfig } from "../../../../shared/config/getAppConfig.ts";

export const generateBlurredImage = async (file: File, maxWidth = 20): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Calculate size keeping aspect ratio
                const scale = maxWidth / img.width;
                const canvas = document.createElement('canvas');
                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                if (!ctx) return reject(new Error("Canvas context is null"));

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // You can apply CSS blur later via style, or try a blur filter here (expensive)
                const base64 = canvas.toDataURL("image/jpeg", 0.6); // compressed JPEG
                resolve(base64);
            };
            img.onerror = reject;
            img.src = event.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};


export const uploadArticleImage = async (file: File): Promise<string> => {
    const { serverUrl } = getAppConfig();

    const formData = new FormData();
    formData.append("image", file); // must match @RequestParam("image")
    const base64Preview = await generateBlurredImage(file);
    console.log(base64Preview);
    const response = await api.post(serverUrl + "/api/uploads/image", {
        body: formData
    });

    const result = await response.json() as { success: number; error: string; file: { url: string;} };

    if (result.success !== 1 || !result.file?.url) {
        throw new Error("Image upload failed: " + (result.error ?? "Unknown error"));
    }

    return result.file.url;
};