import { transcribeAudio, summarizeAudio, extractKeyPointsFromAudio, cleanupAudioFile } from '../service/audioProcessing.service.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = 'uploads/audio';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25 MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Accept audio files
    const filetypes = /mp3|wav|m4a|ogg|aac|flac|wma|amr/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    
    cb(new Error('Only audio files are allowed!'));
  }
}).single('audio');

/**
 * Handle audio transcription request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleAudioTranscription(req, res) {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({
        success: false,
        message: `Error: ${err.message}`
      });
    }
    
    // Everything went fine with the upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No audio file uploaded'
      });
    }
    
    try {
      console.log(`Processing audio file: ${req.file.path}`);
      
      // Process the transcription
      const transcribedText = await transcribeAudio(req.file.path);
      
      // Determine whether to keep or delete the file based on request param
      const keepFile = req.body.keepFile === 'true';
      let audioUrl = null;
      
      if (keepFile) {
        // If keeping the file, generate a URL for it
        // This would depend on your file serving setup
        audioUrl = `/uploads/audio/${path.basename(req.file.path)}`;
      } else {
        // Otherwise, clean up the file
        await cleanupAudioFile(req.file.path);
      }
      
      return res.status(200).json({
        success: true,
        message: 'Audio transcription successful',
        data: {
          transcription: transcribedText,
          audioUrl: keepFile ? audioUrl : null,
          filename: path.basename(req.file.path),
          duration: req.body.duration || null
        }
      });
    } catch (error) {
      console.error('Error in transcription controller:', error);
      
      // Clean up the file in case of error
      if (req.file && req.file.path) {
        await cleanupAudioFile(req.file.path);
      }
      
      return res.status(500).json({
        success: false,
        message: `Transcription failed: ${error.message}`
      });
    }
  });
}

/**
 * Handle audio summarization request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleAudioSummarization(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No audio file uploaded'
      });
    }
    
    try {
      console.log(`Summarizing audio file: ${req.file.path}`);
      
      // Process the summarization
      const summary = await summarizeAudio(req.file.path);
      
      // Clean up the file after processing
      await cleanupAudioFile(req.file.path);
      
      return res.status(200).json({
        success: true,
        message: 'Audio summarization successful',
        data: {
          summary: summary
        }
      });
    } catch (error) {
      console.error('Error in summarization controller:', error);
      
      // Clean up the file in case of error
      if (req.file && req.file.path) {
        await cleanupAudioFile(req.file.path);
      }
      
      return res.status(500).json({
        success: false,
        message: `Summarization failed: ${error.message}`
      });
    }
  });
}

/**
 * Handle key points extraction from audio
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleKeyPointsExtraction(req, res) {
  upload(req, res, async function(err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No audio file uploaded'
      });
    }
    
    try {
      console.log(`Extracting key points from audio file: ${req.file.path}`);
      
      // Process the key points extraction
      const keyPoints = await extractKeyPointsFromAudio(req.file.path);
      
      // Clean up the file after processing
      await cleanupAudioFile(req.file.path);
      
      return res.status(200).json({
        success: true,
        message: 'Audio key points extraction successful',
        data: {
          keyPoints: keyPoints
        }
      });
    } catch (error) {
      console.error('Error in key points extraction controller:', error);
      
      // Clean up the file in case of error
      if (req.file && req.file.path) {
        await cleanupAudioFile(req.file.path);
      }
      
      return res.status(500).json({
        success: false,
        message: `Key points extraction failed: ${error.message}`
      });
    }
  });
}