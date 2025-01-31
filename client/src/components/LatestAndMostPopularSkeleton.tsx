import React from "react";

const LatestAndMostPopularSkeleton: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Latest Post Skeleton */}
        <div className="flex-1">
          <h3 className="text-base md:text-xl font-bold mb-4">Latest Posts</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-2 border border-gray-300 shadow animate-pulse">
                <div className="w-24 h-24 bg-gray-300 rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Skeleton */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">Most Popular</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-2 border border-gray-300 shadow animate-pulse">
                <div className="w-24 h-24 bg-gray-300 rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestAndMostPopularSkeleton;
