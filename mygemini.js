// Import the named export GoogleGenerativeAI:
import { GoogleGenerativeAI } from "@google/generative-ai";
// Import dotenv module to read the .env file, where the API key value has Gemini_API_Key key name:
import dotenv from "dotenv";
// Invoke the .config() method to load environment variables, indlucing the API key, into process.env:
dotenv.config();

// Create a new instance of the GoogleGenerativeAI client, using the API key:
const myGenAI = new GoogleGenerativeAI(process.env.Gemini_API_Key);

// Use .getGenerativeModel() method to retrieve the model and assign it to a variable:
const model = myGenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Theme/function:
const theme = "Please analyse this dream:"

// Enter your dream into the string for prompt below:
const prompt = "I once dreamt I counted sheep until the world imploded";

// Invok the .generateContent() method of the model object, with prompt as an argument:
const result = await model.generateContent(`${theme} ${prompt}`); // await keyword waits for a Promise to resolve.

// Log the response text:
console.log(result.response.text()); // response is a property of the result object, which has the property text