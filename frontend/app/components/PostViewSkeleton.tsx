import React from 'react'

const PostViewSkeleton = () => {
  return (
    <div className="p-5 h-screen w-full bg-[var(--card)] border border-[var(--input)] animate-pulse">
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div className="w-20 h-4 bg-gray-700 rounded"></div>
      </div>

      <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
      <div className="w-full h-6 bg-gray-700 rounded mb-2"></div>
      <div className="w-full h-6 bg-gray-700 rounded mb-2"></div>
      <div className="w-full h-6 bg-gray-700 rounded mb-2"></div>

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

      <div className="mt-6">
        <div className="w-full h-5 bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div className="w-16 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div className="w-16 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
      </div>

      <div className="mt-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div className="w-16 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
      </div>
    </div>
  )
}

export default PostViewSkeleton