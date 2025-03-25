interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${
        className || ""
      }`}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card-elegant overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Skeleton className="w-8 h-8 rounded-full mr-3" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="w-3/4 h-6 mb-2" />
        <Skeleton className="w-full h-4 mb-6" />
        <Skeleton className="w-full h-2.5 mb-3" />
        <div className="flex justify-between items-center">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
