import React from "react";

const BlogCarouselSkeleton: React.FC = () => {
    return (
      <div className="max-w-screen-xl mx-auto py-8">
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex-none w-full p-2 md:w-1/2 lg:w-1/3 animate-pulse">
              <div className="bg-white shadow overflow-hidden">
                <div className="w-full h-48 bg-gray-300 rounded" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4" />
                  <div className="h-6 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default BlogCarouselSkeleton;