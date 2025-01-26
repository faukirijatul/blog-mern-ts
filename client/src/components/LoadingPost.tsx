import React from "react";

const LoadingPost: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Skeleton untuk Thumbnail */}
      <div className="mb-10">
        <div className="bg-gray-300 h-64 rounded-lg animate-pulse mb-4"></div>
        
        {/* Skeleton untuk Title */}
        <div className="h-6 bg-gray-300 w-3/4 mb-2 animate-pulse"></div>
        
        {/* Skeleton untuk Author & Date */}
        <div className="h-4 bg-gray-300 w-1/3 mb-4 animate-pulse"></div>
        
        {/* Skeleton untuk Content */}
        <div className="h-4 bg-gray-300 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-2/3 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-1/2 mb-4 animate-pulse"></div>
        
        {/* Skeleton untuk Likes & Comments */}
        <div className="h-6 bg-gray-300 w-1/4 mb-6 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingPost;
