import dotenv from 'dotenv';
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

dotenv.config();

const geminiAI = new GoogleGenAI({apiKey : process.env.GEMS_API_KEY});

// Convert fs.readFile to a promise-based function
const readFileAsync = promisify(fs.readFile);

/**
 * Translates text to the specified language using Gemini AI
 * @param {string} text - The text to translate
 * @param {string} targetLanguage - The language to translate to (e.g., "Spanish", "French", "Hindi")
 * @returns {Promise<string>} - The translated text
 */
async function translateMessage(text, targetLanguage) {
  try {
    // Input validation
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text input for translation');
    }
    
    if (!targetLanguage || typeof targetLanguage !== 'string') {
      throw new Error('Invalid target language for translation');
    }
    
    console.log(`Translating text to ${targetLanguage}`);
    
    // Create a prompt that clearly instructs the model to translate
    const prompt = `Translate the following text to ${targetLanguage}. 
    Only respond with the translation, no explanations or additional text.
    
    Text to translate: "${text}"`;
    
    // Generate content
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: text,
      config: {
        systemInstruction: prompt,
      }
    });

    // Extract the translated text from the response
    if (response && 
        response.candidates && 
        response.candidates[0] && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts[0]) {
      
      // Get the text from the first part of the first candidate
      const translatedText = response.candidates[0].content.parts[0].text.trim();
      
      console.log(`Translation successful: ${translatedText.substring(0, 30)}${translatedText.length > 30 ? '...' : ''}`);
      
      return translatedText;
    } else {
      throw new Error('Unexpected response structure from Gemini AI');
    }
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(`Failed to translate text: ${error.message}`);
  }
}

/**
 * Generates a caption or description for an image using Gemini AI
 * @param {string} imagePath - Path to the local image file
 * @param {string} prompt - Prompt to describe what to generate about the image
 * @returns {Promise<string>} - The generated text about the image
 */
async function analyzeImage(imagePath, prompt = 'Tell me about this image') {
  try {
    // Input validation
    if (!imagePath || typeof imagePath !== 'string') {
        throw new Error('Invalid image path for analysis');
    }
    
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found at path: ${imagePath}`);
    }
    
    console.log(`Analyzing image at ${imagePath} with prompt: ${prompt}`);
    
    // Read the file
    const imageBuffer = await readFileAsync(imagePath);
    
    // Get the MIME type based on file extension
    const mimeType = getMimeType(path.extname(imagePath).toLowerCase());
    
    // Upload the file to Gemini API
    const imageFile = await geminiAI.files.upload({
      file : imagePath,
    });
    
    // Generate content with the image
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        createUserContent([
          prompt,
          createPartFromUri(imageFile.uri, mimeType),
        ]),
      ],
    });
    
    // Extract the generated text
    if (response && 
        response.candidates && 
        response.candidates[0] && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts[0]) {
      
      const generatedText = response.candidates[0].content.parts[0].text.trim();
      
      console.log(`Image analysis successful: ${generatedText.substring(0, 30)}${generatedText.length > 30 ? '...' : ''}`);
      
      return generatedText;
    } else {
      throw new Error('Unexpected response structure from Gemini AI');
    }
  } catch (error) {
    console.error("Image analysis error:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);
  }
}

/**
 * Generates captions for posts with uploaded images
 * @param {string} imagePath - Path to the local image file
 * @param {string} style - Style of caption to generate (casual, professional, funny, etc.)
 * @returns {Promise<string>} - The generated caption
 */
async function generateImageCaption(imagePath, style = 'casual') {
  try {
    console.log("style inside generateImageCaption " , style);
    const stylePrompts = {
      casual: 'Generate a casual, conversational caption for this image that I could use on social media.',
      professional: 'Create a professional and polished caption for this image suitable for a business post.',
      funny: 'Write a humorous and witty caption for this image that will make people laugh.',
      poetic: 'Compose a poetic and artistic caption for this image using beautiful language.',
      descriptive: 'Provide a detailed description of what\'s in this image in caption form.'
    };

    console.log("stylePrompts" , stylePrompts[style]);
    
    const promptText = stylePrompts[style] || stylePrompts.casual;

    console.log(`Generating caption with style: ${promptText}`);

    console.log(`Generating caption with style: ${promptText}`);
    
    return analyzeImage(imagePath, promptText);
  } catch (error) {
    console.error("Caption generation error:", error);
    throw new Error(`Failed to generate caption: ${error.message}`);
  }
}

/**
 * Helper function to get MIME type from file extension
 * @param {string} extension - The file extension including the dot
 * @returns {string} - The corresponding MIME type
 */
function getMimeType(extension) {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff'
  };
  
  return mimeTypes[extension] || 'application/octet-stream';
}

export {translateMessage , generateImageCaption};