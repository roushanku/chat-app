import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini AI client
const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMS_API_KEY });

// Convert fs functions to promise-based
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

/**
 * Transcribes audio using Gemini AI
 * @param {string} audioFilePath - Path to the audio file
 * @param {string} [prompt="Please transcribe this audio accurately."] - Prompt for transcription instruction
 * @returns {Promise<string>} - The transcribed text
 */
export async function transcribeAudio(audioFilePath, prompt = "Please transcribe this audio accurately , oly give transcribtion.") {
  try {
    // Validate the audio file exists
    if (!fs.existsSync(audioFilePath)) {
      throw new Error(`Audio file not found at path: ${audioFilePath}`);
    }

    console.log(`Transcribing audio file: ${audioFilePath}`);

    //better for small files
    // Read the audio file as base64
    // const audioBuffer = await readFileAsync(audioFilePath);
    // const base64AudioFile = audioBuffer.toString('base64');
    
    // // Get MIME type based on file extension
    // const extension = path.extname(audioFilePath).toLowerCase();
    // const mimeType = getMimeType(extension);

    // // Create content for Gemini API
    // const contents = [
    //   { text: prompt },
    //   {
    //     inlineData: {
    //       mimeType: mimeType,
    //       data: base64AudioFile,
    //     },
    //   },
    // ];

    // Use the file path directly for larger files
    const extension = path.extname(audioFilePath).toLowerCase();
    const mimeType = getMimeType(extension);

    const myfile = await geminiAI.files.upload({
      file: audioFilePath,
      config: { mimeType: "audio/mp3" },
    });

    const contents = createUserContent([
      createPartFromUri(myfile.uri , myfile.mimeType),
      prompt,
    ])

    const response = await geminiAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    
    let transcribedText = ""; 
    
    if (response && 
        response.candidates && 
        response.candidates[0] && 
        response.candidates[0].content && 
        response.candidates[0].content.parts && 
        response.candidates[0].content.parts[0]) {
      
      transcribedText = response.candidates[0].content.parts[0].text.trim();
      console.log(`Transcription completed. Length: ${transcribedText.length} characters`);
    } else {
      console.warn("Unexpected response structure from Gemini AI");
    }
    
    return transcribedText;

  } catch (error) {
    console.error("Audio transcription error:", error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}

/**
 * Summarizes audio content using Gemini AI
 * @param {string} audioFilePath - Path to the audio file
 * @returns {Promise<string>} - Summary of the audio content
 */
export async function summarizeAudio(audioFilePath) {
  return transcribeAudio(audioFilePath, "Please listen to this audio and provide a concise summary.");
}

/**
 * Extracts key points from audio content using Gemini AI
 * @param {string} audioFilePath - Path to the audio file
 * @returns {Promise<string>} - Key points from the audio
 */
export async function extractKeyPointsFromAudio(audioFilePath) {
  return transcribeAudio(
    audioFilePath, 
    "Please extract the main points and key information from this audio in a bullet point format."
  );
}

/**
 * Helper function to get MIME type from file extension
 * @param {string} extension - The file extension including the dot
 * @returns {string} - The corresponding MIME type
 */
function getMimeType(extension) {
  const mimeTypes = {
    '.mp3': 'audio/mp3',
    '.wav': 'audio/wav',
    '.m4a': 'audio/m4a',
    '.ogg': 'audio/ogg',
    '.aac': 'audio/aac',
    '.flac': 'audio/flac',
    '.wma': 'audio/x-ms-wma',
    '.amr': 'audio/amr'
  };
  
  return mimeTypes[extension] || 'audio/mp3'; // default to mp3 if unknown
}

/**
 * Cleans up the audio file after processing
 * @param {string} filePath - Path to the audio file to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function cleanupAudioFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      await unlinkAsync(filePath);
      console.log(`Cleaned up temporary audio file: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error cleaning up audio file ${filePath}:`, error);
    return false;
  }
}