import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Post } from "./Interfaces";

const PostUI: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="p-5 w-full bg-[var(--card)] border border-[var(--input)] rounded-xl shadow-lg">
      
      <div className="flex items-center space-x-3 mb-3">
        <img src={post.user?.image} alt="User Profile" className="w-10 h-10 rounded-full border border-gray-300" />
        <span className="font-medium text-lg">{post.user?.username || "Anonymous"}</span>
      </div>

      <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
      <p className="text-sm text-gray-300">{post.body}</p>

      <div className="flex flex-col gap-3 mt-4 text-sm">
        <div className="flex space-x-3 items-center text-gray-400">
          <ThumbsUp size={18} />
          <span>{post.reactions.likes}</span>
          <ThumbsDown size={18} />
          <span>{post.reactions.dislikes}</span>
          <MessageSquare size={18} />
          <span>{post.comments?.length || 0}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-[var(--input)] rounded-md text-xs text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {post.comments && post.comments.length > 0 && (
        <div className="mt-4 p-3 bg-[var(--input)] rounded-md text-sm text-gray-300 border-l-4 border-blue-400">
          <div className="flex items-center space-x-3">
            <img
              src={post.comments[0].user?.image || "/default-avatar.png"}
              alt="Commenter"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="font-medium">{post.comments[0].user?.username || "Unknown"}</span>
          </div>
          <p className="mt-1">{post.comments[0].body}</p>
        </div>
      )}
    </div>
  );
};

export default PostUI;
