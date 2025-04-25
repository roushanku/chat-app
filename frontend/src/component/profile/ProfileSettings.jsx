import React, { useState } from 'react';
import { useUser } from '../../UserContext';

const ProfileSettings = () => {
  const { activeUser, updateUser } = useUser();
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(activeUser?.bio || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // console.log("active user" , activeUser);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateUser({ password, bio });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;