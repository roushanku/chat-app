import React from 'react';

const ProfilePosts = ({ posts, onDeletePost }) => {
  return (
    <div className="profile-posts">
      <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
      {posts?.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts?.map(post => (
            <li key={post.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
              <button
                onClick={() => onDeletePost(post.id)}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Delete Post
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePosts;