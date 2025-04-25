import React from 'react';
import ProfileHeader from './ProfileHeader.jsx'
import ProfileInfo from './ProfileInfo.jsx';
import ProfilePosts from './ProfilePost.jsx';
import ProfileSettings from './ProfileSettings.jsx';
import ProfilePicture from './ProfilePicture.jsx';

const Profile = () => {

    const user = sessionStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    console.log(parsedUser);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader user={parsedUser}/>
      <ProfilePicture />
      <ProfileInfo />
      <ProfilePosts />
      <ProfileSettings />
    </div>
  );
};

export default Profile;