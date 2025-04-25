import React, { useState, useRef } from 'react';
import { Camera, Loader, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateProfilePicture } from '../../API/auth.api';

const ProfilePicture = ({ currentPicture, onUpdatePicture }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, PNG, or GIF)');
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file for upload
    setSelectedImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) return;

    try {
      setIsUploading(true);
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      // Get auth token from session storage
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const token = storedUser?.data?.token;
      
      if (!token) {
        throw new Error('Authentication required');
      }

      // Send to your backend
      const response = await updateProfilePicture(selectedImage);

      console.log("response after profile update" , response);;

      // if (!response.ok) {
      //   throw new Error(result.message || 'Failed to upload image');
      // }

      // Call the parent component's update function with the Cloudinary URL
      // onUpdatePicture(response.data.url);
      
      // toast.success('Profile picture updated successfully');
      
      // Reset state
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to update profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Profile Picture</h2>
      
      <div className="mb-6 relative">
        <div 
          className="h-40 w-40 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer relative"
          onClick={handleImageClick}
        >
          <img 
            src={previewUrl || currentPicture || 'https://via.placeholder.com/150?text=Profile'} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
            <Camera className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-full">
            <Loader className="h-10 w-10 text-white animate-spin" />
          </div>
        )}
        
        {previewUrl && !isUploading && (
          <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1">
            <Check className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="w-full">
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden"
          accept="image/jpeg,image/png,image/gif" 
          onChange={handleImageChange} 
        />
        
        <div className="flex flex-col gap-3">
          <button 
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors w-full flex justify-center items-center"
            onClick={handleImageClick}
          >
            <Camera className="h-5 w-5 mr-2" /> 
            Select New Photo
          </button>
          
          {selectedImage && (
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 w-full"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Update Profile Picture'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePicture;