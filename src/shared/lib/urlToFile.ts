export async function urlToFile(url: string): Promise<File> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();
    const filename = url.split('/').pop() || 'file';

    return new File([blob], filename, { type: blob.type });
}
