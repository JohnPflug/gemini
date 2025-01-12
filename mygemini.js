// Import the named export GoogleGenerativeAI:
import { GoogleGenerativeAI } from "@google/generative-ai";
// Import dotenv module to read the .env file, where the API key value has Gemini_API_Key key name:
import dotenv from "dotenv";

// Invoke the .config() method to load environment variables, indlucing the API key, into process.env:
dotenv.config();

// Dream analysis function:
export async function dreamAnalysis(yourDream) {
    // Dream analsysis instance:
    // Create a new instance of the GoogleGenerativeAI client, using the API key:
    const myDreamGen = new GoogleGenerativeAI(process.env.Gemini_API_Key);

    // Use .getGenerativeModel() method to retrieve the model and assign it to a variable:
    const dreamModel = myDreamGen.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Theme/function:
    const theme = "Please analyse this dream:"

    // Invok the .generateContent() method of the model object, with prompt as an argument:
    const dreamResult = await dreamModel.generateContent(`${theme} ${yourDream}`); // await keyword waits for a Promise to resolve.

    // Get response text:
    const dreamResponse = dreamResult.response.text(); // response is a property of the result object, which has the property text

    // // Log the response text:
    // console.log('Interpretation: ', dreamResponse); // response is a property of the result object, which has the property text

    // Return dreamResponse:
    return dreamResponse;
};

export async function promptGeneration(dreamInput) {
    // Image prompt instance:
    const myImageGen = new GoogleGenerativeAI(process.env.Gemini_API_Key);
    const imageModel = myImageGen.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Goal/function:
    const goal = "Please convert this text, summarising the information into a visual depiction that can be fed into a text-to-image generative AI model as a prompt (please provide only one option):"
    // Invok the .generateContent() method of the model object, with prompt as an argument:
    const imagePromptGen = await imageModel.generateContent(`${goal} ${dreamInput}`); // await keyword waits for a Promise to resolve.

    // Get response text:
    const imagePrompt = imagePromptGen.response.text(); // response is a property of the result object, which has the property text

    // Return imagePrompt:
    return imagePrompt;
};