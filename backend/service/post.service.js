import Post from "../Models/post.model";

async function CreatePostService(content , author) {
    try {
        const newPost = await Post.create({
            content,
            author,
        })
        return {status : 201 , message : "Post created successfully" , post : newPost};
    } catch (error) {
        console.error("Error creating post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function fetchPostByIdService(postId) {
    try{
        const post = await Post.findById(postId).populate("author", "username");
        if (!post) {
            return {status : 404 , message : "Post not found"};
        }
        return {status : 200 , message : "Post fetched successfully" , post};
    }
    catch(error) {
        console.error("Error fetching post by ID:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function fetchAllPostsService(userId) {
    try {
        const posts = await Post.find({author : userId}).populate("author", "username");
        if (!posts) {
            return {status : 404 , message : "No posts found"};
        }
        return {status : 200 , message : "Posts fetched successfully" , posts};
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function updatePostService(postId, content) {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content },
            { new: true }
        );
        if (!updatedPost) {
            return {status : 404 , message : "Post not found"};
        }
        return {status : 200 , message : "Post updated successfully" , post : updatedPost};
    } catch (error) {
        console.error("Error updating post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function deletePostService(postId) {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return {status : 404 , message : "Post not found"};
        }
        return {status : 200 , message : "Post deleted successfully" , post : deletedPost};
    } catch (error) {
        console.error("Error deleting post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}
async function likePostService(postId, userId) {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return {status : 404 , message : "Post not found"};
        }
        if (post.likes.includes(userId)) {
            return {status : 400 , message : "Post already liked"};
        }
        post.likes.push(userId);
        await post.save();
        return {status : 200 , message : "Post liked successfully" , post};
    } catch (error) {
        console.error("Error liking post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function unlikePostService(postId, userId) {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return {status : 404 , message : "Post not found"};
        }
        if (!post.likes.includes(userId)) {
            return {status : 400 , message : "Post not liked yet"};
        }
        post.likes.pull(userId);
        await post.save();
        return {status : 200 , message : "Post unliked successfully" , post};
    } catch (error) {
        console.error("Error unliking post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function commentOnPostService(postId, userId, text) {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return {status : 404 , message : "Post not found"};
        }
        post.comments.push({ user: userId, text });
        await post.save();
        return {status : 200 , message : "Comment added successfully" , post};
    } catch (error) {
        console.error("Error commenting on post:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

async function deleteCommentService(postId, commentId) {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return {status : 404 , message : "Post not found"};
        }
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return {status : 404 , message : "Comment not found"};
        }
        post.comments.splice(commentIndex, 1);
        await post.save();
        return {status : 200 , message : "Comment deleted successfully" , post};
    } catch (error) {
        console.error("Error deleting comment:", error);
        return {status : 500 , message : "Internal Server Error"};
    }
}

export {
    CreatePostService,
    fetchPostByIdService,
    fetchAllPostsService,
    updatePostService,
    deletePostService,
    likePostService,
    unlikePostService,
    commentOnPostService,
    deleteCommentService
};