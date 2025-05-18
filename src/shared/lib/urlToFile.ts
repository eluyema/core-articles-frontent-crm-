function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function urlToFile(url: string): Promise<File> {
    const maxRetries = 5;
    const retryDelay = 5000; // 5 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }

            const blob = await response.blob();
            const filename = url.split('/').pop() || 'file';

            return new File([blob], filename, { type: blob.type });
        } catch (error) {
            if (attempt === maxRetries) {
                throw new Error(`Failed to fetch image after ${maxRetries} attempts: ${error}`);
            }
            console.warn(`Attempt ${attempt} failed. Retrying in 5 seconds...`, error);
            await delay(retryDelay);
        }
    }

    throw new Error('Unexpected error in urlToFile');
}
