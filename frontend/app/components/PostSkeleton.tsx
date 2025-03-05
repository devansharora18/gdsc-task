import React from "react";

const PostSkeleton = () => {
  return (
    <div className="p-5 w-full bg-[var(--card)] border border-[var(--input)] rounded-xl shadow-lg animate-pulse">
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div className="w-20 h-4 bg-gray-700 rounded"></div>
      </div>

      <div className="w-full h-5 bg-gray-700 rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-700 rounded"></div>

      <div className="flex space-x-3 items-center text-gray-400 mt-4">
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
        <div className="w-6 h-4 bg-gray-700 rounded"></div>
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
        <div className="w-6 h-4 bg-gray-700 rounded"></div>
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
        <div className="w-6 h-4 bg-gray-700 rounded"></div>
      </div>

      <div className="flex space-x-2 mt-4">
        <div className="w-12 h-4 bg-gray-700 rounded"></div>
        <div className="w-16 h-4 bg-gray-700 rounded"></div>
        <div className="w-10 h-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
