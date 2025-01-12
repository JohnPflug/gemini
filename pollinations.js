import fs from 'fs';
import fetch from 'node-fetch';

export async function imageGeneration(prompt) {
    async function downloadImage(imageUrl) {
        // Fetching the image from the URL
        const response = await fetch(imageUrl);
        // Reading the response as a buffer
        const buffer = await response.buffer();
        // Writing the buffer to a file named 'image.png'
        fs.writeFileSync('image.png', buffer);
        // Logging completion message
        console.log('Download Completed');
    }

    // Image details
    const width = 1957;
    const height = 978;
    const seed = 875471; // Each seed generates a new image variation
    const model = 'flux'; // Using 'flux' as default if model is not provided

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    // downloadImage(imageUrl);
    return imageUrl;
};