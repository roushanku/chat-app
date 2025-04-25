import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadImageToCloudnary } from '../service/cloudnary.service.js';
import User from '../Models/user.model.js';

// Ensure upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
}).single('image'); // 'image' is the field name expected in the request

/**
 * Handle file upload directly in the controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleFileUploadController(req, res) {
    console.log("inside handleFileUploadController");
    // Process the upload with multer
    // const {userId} = req.body;
    console.log("req.body" , req.body);
    upload(req, res, async (err) => {
        if (err) {
            // Handle multer errors
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        success: false,
                        message: 'File too large, maximum size is 5 MB'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: `Upload error: ${err.message}`
                });
            }
            
            // Handle other errors
            return res.status(500).json({
                success: false,
                message: `Error during upload: ${err.message}`
            });
        }
        
        try {
            // Check if a file was provided
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: 'No file was uploaded'
                });
            }
            
            console.log('File saved locally at:', req.file.path);
            
            // Now upload the local file to Cloudinary
            const cloudinaryResult = await uploadImageToCloudnary(req.file.path);
            
            // Delete the local file after successful upload
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting local file:', unlinkErr);
                    // Continue execution even if delete fails
                }
            });

            const profile_picture_url = "";

            // console.log("userId" , userId);

            // const user = await User.findByIdAndUpdate(userId, { profile_picture: profile_picture_url }, { new: true }).exec();

            // if (!user) {
            //     return { error: 'User not found' };
            // }

            // return res.status(200).json({
            //     success: true,
            //     message: 'Profile picture updated successfully',
            //     data: {
            //         // url: cloudinaryResult.url
                    
            //     }
            // });
            
            // Return success response with Cloudinary URL
            return res.status(200).json({
                success: true,
                message: 'File uploaded successfully',
                data: {
                    url: cloudinaryResult.url,
                    public_id: cloudinaryResult.public_id,
                    width: cloudinaryResult.width,
                    height: cloudinaryResult.height
                }
            });
        } catch (error) {
            console.error('Error processing upload:', error);
            
            // Clean up the temporary file if it exists
            if (req.file && req.file.path) {
                fs.unlink(req.file.path, () => {});
            }
            
            return res.status(500).json({
                success: false,
                message: 'Error uploading to cloud storage',
                error: error.message
            });
        }
    });
};

/**
 * Handles multiple file uploads
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function handleMultipleFileUpload(req, res) {
    const multiUpload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
    }).array('images', 5); // Allow up to 5 images
    
    multiUpload(req, res, async (err) => {
        // Similar error handling and processing as in handleFileUpload
        // but iterates through req.files array
        // ...
    });
};

export { handleFileUploadController, handleMultipleFileUpload };