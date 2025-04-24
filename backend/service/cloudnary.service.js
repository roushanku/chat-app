import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

async function uploadImageToCloudnary(imagePath) {
    try{
        // console.log("api key" , process.env.CLOUDINARY_API_KEY);
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    
        const uploadResult = await cloudinary.uploader.upload(imagePath, {});

        // console.log("Image uploaded to Cloudinary:", uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        // console.log(optimizeUrl);
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        
        console.log(autoCropUrl);
        return {
            url: optimizeUrl,
            public_id: uploadResult.public_id,
            width: uploadResult.width,
            height: uploadResult.height
        };
    }
    catch(error){
        console.error("Error uploading image to Cloudinary:", error);
    }
}

async function deleteImageFromCloudnary (publicId) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};

export {uploadImageToCloudnary , deleteImageFromCloudnary};