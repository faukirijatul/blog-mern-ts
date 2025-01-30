export const SkeletonRow = () => (
    <tr className="animate-pulse bg-gray-100">
      <td className="p-4 text-center">
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </td>
      {Array(7)
        .fill(null)
        .map((_, i) => (
          <td key={i} className="p-4">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
          </td>
        ))}
      <td className="p-4 text-center">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
  
export const SkeletonCard = () => (
    <div className="relative flex items-start gap-4 bg-white p-4 border border-gray-300 shadow animate-pulse">
      <div className="min-w-32 h-32 bg-gray-300 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );