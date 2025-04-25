import React from 'react';
import { User } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
      <div className="relative">
        <img
          src={user?.profilePicture || '/default-profile.png'}
          alt={`${user.name}'s profile`}
          className="h-16 w-16 rounded-full border-2 border-blue-600"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;