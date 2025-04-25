import { translateMessage , generateImageCaption} from '../service/llm.service.js';
import path from 'path';

import multer from 'multer';
import fs from 'fs';

// Configure storage for temporary image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/temp';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Set up multer for single image uploads
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}).single('image');


/**
 * Handle translation requests
 * @param {Object} req - Express request object containing text and targetLanguage
 * @param {Object} res - Express response object
 */
async function handleTranslation(req, res) {
  try {
    const { text, targetLanguage } = req.body;
    
    if (!text || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Text and target language are required'
      });
    }
    
    const translatedText = await translateMessage(text, targetLanguage);
    
    return res.status(200).json({
      success: true,
      data: {
        originalText: text,
        translatedText: translatedText,
        targetLanguage: targetLanguage
      }
    });
  } catch (error) {
    console.error('Translation controller error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Translation failed'
    });
  }
}



async function handleCaptionGeneration(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    }
    
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No image file was uploaded'
        });
      }
      
      const imagePath = req.file.path;
      const { style } = req.body;

      console.log("style inside controller" , style);
      
      const caption = await generateImageCaption(imagePath, style || 'casual');
      
      // Clean up the temporary file
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error removing temp file:', err);
      });
      
      return res.status(200).json({
        success: true,
        data: {
          caption: caption,
          style: style || 'casual'
        }
      });
    } catch (error) {
      console.error('Caption generation controller error:', error);
      
      // Clean up the temporary file if it exists
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, () => {});
      }
      
      return res.status(500).json({
        success: false,
        message: error.message || 'Caption generation failed'
      });
    }
  });
}

export { handleTranslation , handleCaptionGeneration};