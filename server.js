// Imports:
import http from 'http'; // node http module
import fs from 'fs'; // node fs module
import { dreamAnalysis, promptGeneration } from "./mygemini.js"; // Import dream analysis functions
import { imageGeneration } from "./pollinations.js"; // Import image generation function

// Server instance:
const server = http.createServer((req, res) => {
    const { method, url } = req;
    if (url === "/" && method === "GET") {
        fs.readFile("./views/index.html", 'utf8', (err, data) => {
            if (err) {
                res.setHeader('Content-Type', 'text/plain');
                res.end('Server Error');
                return;
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (url === "/" && method === "POST") {
        console.log('POST request made');
        let body = "";

        req.on("data", (packet) => {
            body += packet.toString();
        });
        req.on("end", async () => {
            console.log(body);
            try {
                const dreamResponse = await dreamAnalysis(body);
                const imagePrompt = await promptGeneration(dreamResponse);
                const imageURL = await imageGeneration(imagePrompt); // Assuming it saves the image as "image.png"

                // Send the response with dreamResponse and image data
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    dreamResponse,
                    imageURL
                }));
            } catch (err) {
                console.log(err);
                res.setHeader('Content-Type', 'text/plain');
                res.end("Error: The operation failed.");
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});