import {OutputData} from "@editorjs/editorjs";

export const extractImageUrlsFromEditorData = (outputData: OutputData): string[] => {
    const imageUrls: string[] = [];

    outputData.blocks.forEach((block) => {
        if (block.type === 'image' && block.data?.file?.url) {
            const imageUrl = block.data.file.url;

            imageUrls.push(imageUrl);
        }
    });

    return imageUrls;
};
