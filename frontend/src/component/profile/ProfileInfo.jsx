import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext';

const ProfileInfo = () => {
  // const { activeUser, updateUser } = useUser();
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const user = sessionStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  const activeUser = parsedUser.data.user;
  
  console.log("active user" , parsedUser.data.user);
  useEffect(() => {
    setBio(activeUser?.bio || '');
    setEmail(activeUser?.email || '');
  }, [activeUser]);

  const handleSave = () => {
    updateUser({ ...activeUser, bio, email });
    setIsEditing(false);
  };

  return (
    <div className="profile-info">
      <h2 className="text-lg font-semibold">Profile Information</h2>
      <div className="mt-4">
        <label className="block text-sm font-medium">Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        ) : (
          <p className="mt-1 text-gray-700">{email}</p>
        )}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium">Bio:</label>
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        ) : (
          <p className="mt-1 text-gray-700">{bio}</p>
        )}
      </div>
      <div className="mt-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;