import React, { useState } from 'react';
import { 
  ThumbsUp, 
  Heart, 
  Smile, 
  MessageCircle, 
  Send 
} from 'lucide-react';
import NavBar from './Navbar';

const ReactionIcon = ({ Icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-full transition-all duration-300 ${
      isActive 
        ? 'bg-blue-100 text-blue-600 scale-110' 
        : 'hover:bg-gray-100'
    }`}
  >
    <Icon className="h-6 w-6" />
  </button>
);

const UserProfileModal = ({ user, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <div className="flex flex-col items-center">
        <img 
          src={`https://via.placeholder.com/150`} 
          alt={user.name} 
          className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500" 
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">Software Engineer</p>
        <div className="mt-4 flex space-x-4">
          <div className="text-center">
            <p className="font-bold">150</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">1.2K</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PostCard = ({ post }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const reactionOptions = [
    { icon: ThumbsUp, type: 'thumbsUp' },
    { icon: Heart, type: 'love' },
    { icon: Smile, type: 'smile' }
  ];

  const handleReactionToggle = (reactionType) => {
    setSelectedReaction(selectedReaction === reactionType ? null : reactionType);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        user: 'Current User'
      };
      setComments([...comments, newComment]);
      setCommentText('');
      setIsCommentBoxOpen(false);
    }
  };

  return (
    
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4 mb-4">
      {/* User Header */}
      <div 
        className="flex items-center mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
        onClick={() => setIsProfileVisible(true)}
      >
        <img 
          src={`https://via.placeholder.com/50`} 
          alt={post.user.name} 
          className="w-10 h-10 rounded-full mr-3" 
        />
        <div>
          <h3 className="font-semibold">{post.user.name}</h3>
          <p className="text-xs text-gray-500">Software Engineer</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p>{post.content}</p>
        {post.image && (
          <img 
            src={`https://via.placeholder.com/400x300`} 
            alt="Post" 
            className="w-full rounded-lg mt-3" 
          />
        )}
      </div>

      {/* Reactions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {reactionOptions.map(({ icon, type }) => (
            <ReactionIcon 
              key={type}
              Icon={icon}
              isActive={selectedReaction === type}
              onClick={() => handleReactionToggle(type)}
            />
          ))}
        </div>
        <button 
          onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}
          className="flex items-center text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {post.comments + comments.length} Comments
        </button>
      </div>

      {/* Comments Section */}
      {isCommentBoxOpen && (
        <div>
          {comments.map(comment => (
            <div 
              key={comment.id} 
              className="bg-gray-100 p-2 rounded-lg mb-2"
            >
              <p>{comment.text}</p>
            </div>
          ))}
          <div className="flex mt-2">
            <input 
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow p-2 border rounded-l-lg"
            />
            <button 
              onClick={handleAddComment}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isProfileVisible && (
        <UserProfileModal 
          user={post.user} 
          onClose={() => setIsProfileVisible(false)} 
        />
      )}
    </div>
  );
};

const PostList = () => {
  const posts = [
    {
      id: 1,
      user: { name: 'John Doe' },
      content: 'Just had an amazing day hiking in the mountains!',
      comments: 5
    },
    {
      id: 2,
      user: { name: 'Jane Smith' },
      content: 'Excited about my new project!',
      comments: 12
    },
    {
        id: 2,
        user: { name: 'Jane Smith' },
        content: 'Excited about my new project!',
        comments: 12
      },
      {
        id: 2,
        user: { name: 'Jane Smith' },
        content: 'Excited about my new project!',
        comments: 12
      },
      {
        id: 2,
        user: { name: 'Jane Smith' },
        content: 'Excited about my new project!',
        comments: 12
      },
      {
        id: 2,
        user: { name: 'Jane Smith' },
        content: 'Excited about my new project!',
        comments: 12
      },
      {
        id: 2,
        user: { name: 'Jane Smith' },
        content: 'Excited about my new project!',
        comments: 12
      }
  ];

  return (
    <div className="flex flex-col items-center p-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;